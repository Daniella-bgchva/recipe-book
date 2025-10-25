import { createSlice } from '@reduxjs/toolkit';
import type { Comment } from '../../types.ts';
import { fetchCommentsByRecipe, addComment, deleteComment } from './commentsThunk.ts';

interface CommentsState {
  items: Comment[];
  fetchLoading: boolean;
  addLoading: boolean;
  deleteLoading: boolean;
}

const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  addLoading: false,
  deleteLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByRecipe.pending, (state) => {
        state.fetchLoading = true;
      })

      .addCase(fetchCommentsByRecipe.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })

      .addCase(fetchCommentsByRecipe.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.addLoading = false;
        state.items.push(payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.addLoading = false;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectComments: (state: CommentsState) => state.items,
    selectFetchLoading: (state: CommentsState) => state.fetchLoading,
    selectAddLoading: (state: CommentsState) => state.addLoading,
    selectDeleteLoading: (state: CommentsState) => state.deleteLoading,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { selectComments, selectFetchLoading, selectAddLoading, selectDeleteLoading } =
  commentsSlice.selectors;
