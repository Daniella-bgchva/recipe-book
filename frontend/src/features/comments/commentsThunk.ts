import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import type { Comment } from '../../types.ts';

export const fetchCommentsByRecipe = createAsyncThunk<Comment[], string>(
  'comments/fetchByRecipe',
  async (recipeId) => {
    const { data } = await axiosApi.get<Comment[]>(`/recipes/${recipeId}/comments`);
    return data;
  },
);

export const addComment = createAsyncThunk<Comment, { recipeId: string; text: string }>(
  'comments/addComment',
  async ({ recipeId, text }) => {
    const { data } = await axiosApi.post<Comment>(`/recipes/${recipeId}/comments`, { text });
    return data;
  },
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteComment',
  async (commentId) => {
    await axiosApi.delete(`/comments/${commentId}`);
  },
);
