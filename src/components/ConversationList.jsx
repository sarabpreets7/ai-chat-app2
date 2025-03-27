import React from 'react';
import { useSelector } from 'react-redux';

function ConversationList() {
  const conversations = useSelector((state) => state.conversations?.list || []);

  return (
    <div className="conversation-list">
      <h2>Past Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul>
          {conversations.map((conversation, index) => (
            <li key={index}>
              <h4>Conversation {index + 1}</h4>
              {conversation.map((msg, i) => (
                <p key={i} className={msg.sender}>
                  <strong>{msg.sender.toUpperCase()}:</strong> {msg.text}
                </p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ConversationList;