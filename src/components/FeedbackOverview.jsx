import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearConversations } from '../redux/conversationsSlice';
import { Button, TextField, MenuItem } from '@mui/material';

function FeedbackOverview() {
  const feedbackList = useSelector((state) => state.conversations.conversations || []);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleClear = () => {
    dispatch(clearConversations());
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredList = feedbackList
    .filter(convo =>
      convo.feedback?.feedback.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.feedback?.rating - b.feedback?.rating;
      } else {
        return b.feedback?.rating - a.feedback?.rating;
      }
    });

  return (
    <div className="feedback-overview">
      <h2>Feedback Overview</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <TextField
          label="Search Feedback"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
        />

        <TextField
          select
          label="Sort by Rating"
          value={sortOrder}
          onChange={handleSortChange}
          size="small"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </div>

      {filteredList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div style={{ maxHeight: '550px', overflow: 'scroll' }} className="feedback-sub-container">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Conversation</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((conversation, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {Array.isArray(conversation.messages) ? (
                      conversation.messages.map((msg, i) => (
                        <p key={i}>
                          <strong>{msg.sender.toUpperCase()}:</strong> {msg.text}
                        </p>
                      ))
                    ) : (
                      <p>No messages found.</p>
                    )}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {conversation.feedback?.rating || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="contained" color="primary" onClick={handleClear} style={{ marginTop: '10px' }}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}

export default FeedbackOverview;
