import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatInterface from './components/ChatInterface';
import FeedbackOverview from './components/FeedbackOverview';
import ConversationView from './components/ConversationView';
import ShareButton from './components/ShareButton';
import styles from './styles';

function App() {
  const [conversationId, setConversationId] = useState(null);

  const handleConversationSaved = (id) => {
    setConversationId(id);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={styles.appContainer}>
            <div style={styles.mainContent}>
              <div>
                <ChatInterface style={styles.chatInterface} onSave={handleConversationSaved} />
                <ShareButton style={styles.shareButton} conversationId={conversationId} />
              </div>
              <FeedbackOverview style={styles.feedbackOverview} />
            </div>
          </div>
        } />
        <Route path="/conversation/:id" element={<ConversationView />} />
      </Routes>
    </Router>
  );
}

export default App;