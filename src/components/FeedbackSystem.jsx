import React, { useState } from 'react';

function FeedbackSystem() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating > 0 || feedback.trim()) {
      console.log('Feedback submitted:', { rating, feedback });
      setRating(0);
      setFeedback('');
    }
  };

  return (
    <div className="feedback-system">
      <h2>Feedback System</h2>
      <div className="rating">
        <p>Rate the conversation:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'filled' : 'empty'}
            onClick={() => handleRating(star)}
          >
            ⭐
          </span>
        ))}
      </div>
      <textarea
        placeholder="Leave your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FeedbackSystem;