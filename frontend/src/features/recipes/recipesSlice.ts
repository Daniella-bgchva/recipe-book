import { createSlice } from '@reduxjs/toolkit';
import type { Recipe } from '../../types';
import {
  createRecipe,
  deleteRecipe,
  fetchMyRecipes,
  fetchOneRecipe,
  fetchRecipes,
  fetchRecipesByUser,
} from './recipesThunk.ts';

interface RecipesState {
  items: Recipe[];
  myItems: Recipe[];
  authorItems: Recipe[];
  one: Recipe | null;
  fetchLoading: boolean;
  myLoading: boolean;
  authorLoading: boolean;
  oneLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: RecipesState = {
  items: [],
  myItems: [],
  authorItems: [],
  one: null,
  fetchLoading: false,
  myLoading: false,
  authorLoading: false,
  oneLoading: false,
  createLoading: false,
  deleteLoading: false,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchMyRecipes.pending, (state) => {
        state.myLoading = true;
      })
      .addCase(fetchMyRecipes.fulfilled, (state, { payload }) => {
        state.myLoading = false;
        state.myItems = payload;
      })
      .addCase(fetchMyRecipes.rejected, (state) => {
        state.myLoading = false;
      });

    builder
      .addCase(fetchRecipesByUser.pending, (state) => {
        state.authorLoading = true;
      })
      .addCase(fetchRecipesByUser.fulfilled, (state, { payload }) => {
        state.authorLoading = false;
        state.authorItems = payload;
      })
      .addCase(fetchRecipesByUser.rejected, (state) => {
        state.authorLoading = false;
      });

    builder
      .addCase(fetchOneRecipe.pending, (state) => {
        state.oneLoading = true;
      })
      .addCase(fetchOneRecipe.fulfilled, (state, { payload }) => {
        state.oneLoading = false;
        state.one = payload;
      })
      .addCase(fetchOneRecipe.rejected, (state) => {
        state.oneLoading = false;
      });

    builder
      .addCase(createRecipe.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createRecipe.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteRecipe.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteRecipe.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectRecipes: (state: RecipesState) => state.items,
    selectMyRecipes: (state: RecipesState) => state.myItems,
    selectAuthorRecipes: (state: RecipesState) => state.authorItems,
    selectOneRecipe: (state: RecipesState) => state.one,
    selectRecipesLoading: (state: RecipesState) => state.fetchLoading,
    selectMyRecipesLoading: (state: RecipesState) => state.myLoading,
    selectAuthorRecipesLoading: (state: RecipesState) => state.authorLoading,
    selectOneRecipeLoading: (state: RecipesState) => state.oneLoading,
    selectCreateRecipeLoading: (state: RecipesState) => state.createLoading,
    selectDeleteRecipeLoading: (state: RecipesState) => state.deleteLoading,
  },
});

export const recipesReducer = recipesSlice.reducer;
export const {
  selectRecipes,
  selectMyRecipes,
  selectAuthorRecipes,
  selectOneRecipe,
  selectRecipesLoading,
  selectMyRecipesLoading,
  selectAuthorRecipesLoading,
  selectOneRecipeLoading,
  selectCreateRecipeLoading,
  selectDeleteRecipeLoading,
} = recipesSlice.selectors;
