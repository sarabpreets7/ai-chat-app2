import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase"; 

// Initial state
const initialState = {
  conversations: [],
  loading: false,
  error: null,
};

// Async thunk to fetch conversations
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const conversationsSnapshot = await getDocs(collection(db, "conversations"));
      const conversations = [];

      // Fetch feedback data
      const feedbackSnapshot = await getDocs(collection(db, "feedback"));
      const feedbackData = {};
      feedbackSnapshot.forEach((doc) => {
        const data = doc.data();
        feedbackData[data.conversationId] = {
          feedback: data.feedback,
          rating: data.rating,
          timestamp: data.timestamp?.toDate().toISOString(), // Convert to ISO string
        };
      });

      for (const doc of conversationsSnapshot.docs) {
        const conversationData = doc.data();

        // Fetch messages if available
        let messages = [];
        try {
          const messagesSnapshot = await getDocs(
            collection(db, "conversations", doc.id, "messages")
          );
          messages = messagesSnapshot.docs.map((msgDoc) => msgDoc.data());
        } catch (err) {
          console.log(doc.id);
        }

        const feedback = feedbackData[doc.id] || null;

        conversations.push({
          id: doc.id,
          messages,
          feedback,
          ...conversationData,
        });
      }

      console.log("Fetched", conversations);
      return conversations;
    } catch (error) {
      console.error("Error fetching:", error);
      return rejectWithValue(error.message);
    }
  }
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    clearConversations: (state) => {
      state.conversations = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addConversation, clearConversations, setLoading } = conversationsSlice.actions;

export default conversationsSlice.reducer;
