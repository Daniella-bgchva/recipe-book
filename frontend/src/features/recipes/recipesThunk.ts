import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type { Recipe, RecipeMutation, GlobalError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchRecipes = createAsyncThunk<Recipe[], void, { rejectValue: GlobalError }>(
  'recipes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get<Recipe[]>('/recipes');
      return data;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data as GlobalError);
      }
      throw err;
    }
  },
);

export const fetchMyRecipes = createAsyncThunk<Recipe[], void, { rejectValue: GlobalError }>(
  'recipes/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get<Recipe[]>('/recipes/mine');
      return data;
    } catch (err) {
      if (isAxiosError(err) && err.response)
        return rejectWithValue(err.response.data as GlobalError);
      throw err;
    }
  },
);

export const fetchRecipesByUser = createAsyncThunk<Recipe[], string, { rejectValue: GlobalError }>(
  'recipes/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get<Recipe[]>('/recipes', { params: { user: userId } });
      return data;
    } catch (err) {
      if (isAxiosError(err) && err.response)
        return rejectWithValue(err.response.data as GlobalError);
      throw err;
    }
  },
);

export const fetchOneRecipe = createAsyncThunk<Recipe, string, { rejectValue: GlobalError }>(
  'recipes/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get<Recipe>('/recipes/' + id);
      return data;
    } catch (err) {
      if (isAxiosError(err) && err.response)
        return rejectWithValue(err.response.data as GlobalError);
      throw err;
    }
  },
);

export const createRecipe = createAsyncThunk<void, RecipeMutation, { rejectValue: GlobalError }>(
  'recipes/create',
  async (recipeMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', recipeMutation.title);
      formData.append('recipe', recipeMutation.recipe);
      formData.append('ingredients', JSON.stringify(recipeMutation.ingredients));
      if (recipeMutation.image) formData.append('image', recipeMutation.image);

      await axiosApi.post('/recipes', formData);
    } catch (err) {
      if (isAxiosError(err) && err.response)
        return rejectWithValue(err.response.data as GlobalError);
      throw err;
    }
  },
);

export const deleteRecipe = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'recipes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosApi.delete('/recipes/' + id);
    } catch (err) {
      if (isAxiosError(err) && err.response)
        return rejectWithValue(err.response.data as GlobalError);
      throw err;
    }
  },
);
