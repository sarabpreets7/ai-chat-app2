import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addConversation } from '../redux/conversationsSlice';
import { getAIResponse } from '../services/service';
import '../style/ChatInterface.css';
import db from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button, TextField, Snackbar, Alert, Rating, Typography } from '@mui/material';

function ChatInterface(props) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: String(input) };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');

      try {
        const aiResponse = await getAIResponse(input);
        const aiMessage = {
          sender: 'ai',
          text: typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse)
        };

        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages);
        dispatch(addConversation(finalMessages));
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    }
  };

  const saveConversation = async () => {
    if (messages.length === 0) {
      setSnackbar({ open: true, message: 'No conversation to save!', severity: 'warning' });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "conversations"), {
        messages: messages,
        timestamp: serverTimestamp(),
      });
      const newConversation = {
        id: docRef.id,
        messages: messages,
        timestamp: new Date().toISOString(), // Or keep serverTimestamp if needed
      };
      setConversationId(docRef.id);
      dispatch(addConversation(newConversation)); // ✅ Update Redux immediately
      setSnackbar({ open: true, message: 'Conversation saved! Provide your feedback.', severity: 'success' });
      setShowFeedback(true);
      if (props.onSave) {
        props.onSave(docRef.id);
      }
    } catch (error) {
      console.error("Error saving conversation: ", error);
      setSnackbar({ open: true, message: 'Error saving conversation.', severity: 'error' });
    }
};

const handleFeedbackSubmit = async (rating, feedback) => {
  if (conversationId) {
    try {
      await addDoc(collection(db, "feedback"), {
        conversationId,
        rating,
        feedback,
        timestamp: serverTimestamp(),
      });
      setSnackbar({ open: true, message: 'Feedback submitted!', severity: 'success' });
      setShowFeedback(false);
      setMessages([]); // Move this below
    } catch (error) {
      console.error("Error saving feedback: ", error);
      setSnackbar({ open: true, message: 'Error submitting feedback.', severity: 'error' });
    }
  }
};

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className='button-container'>
          <Button style={{ marginRight: '15px' }} variant="contained" color="primary" onClick={handleSend}>Send</Button>
          <Button variant="contained" color="success" onClick={saveConversation}>Finish Conversation</Button>
        </div>
      </div>

      {showFeedback && <FeedbackSystem onSubmit={handleFeedbackSubmit} />}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

function FeedbackSystem({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = () => {
    if (rating > 0 || feedback.trim()) {
      onSubmit(rating, feedback);
      setRating(0);
      setFeedback('');
      setSnackbar({ open: true, message: 'Feedback submitted successfully!', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'Please provide a rating or feedback.', severity: 'warning' });
    }
  };

  return (
    <div className="feedback-system">
      <Typography variant="h5">Feedback System</Typography>
      <Typography variant="body1">Rate the conversation:</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
      />
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        placeholder="Leave your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ChatInterface;