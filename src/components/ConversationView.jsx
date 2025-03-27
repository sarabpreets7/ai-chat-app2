import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { CircularProgress, Typography } from '@mui/material';

function ConversationView() {
  const { id } = useParams();  // Get conversationId from URL
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const docRef = doc(db, "conversations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMessages(docSnap.data().messages);
        } else {
          console.log("No conversation!");
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversation();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Conversation Details</Typography>
      {messages.length > 0 ? (
        messages.map((msg, idx) => (
          <Typography key={idx} style={{ marginBottom: '10px' }}>
            <b>{msg.sender === 'user' ? 'You' : 'AI'}:</b> {msg.text}
          </Typography>
        ))
      ) : (
        <Typography>No messages found.</Typography>
      )}
    </div>
  );
}

export default ConversationView;