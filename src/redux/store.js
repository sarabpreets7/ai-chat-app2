import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from '../redux/conversationsSlice';
export const store = configureStore({
  reducer: {
      conversations: conversationReducer, // Use 'conversations' instead of 'conversation'
  },
});