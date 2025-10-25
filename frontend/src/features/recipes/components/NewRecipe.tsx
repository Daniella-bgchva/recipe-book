import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreateRecipeLoading } from '../recipesSlice.ts';
import { createRecipe } from '../recipesThunk.ts';
import { Box, Typography } from '@mui/material';
import RecipeForm from './RecipeForm.tsx';
import type {RecipeMutation} from "../../../types";

const NewRecipe = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateRecipeLoading);

  const onFormSubmit = async (recipeData: RecipeMutation) => {
    await dispatch(createRecipe(recipeData)).unwrap();
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 5,
        p: 3,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
        Add New Recipe
      </Typography>
      <RecipeForm onSubmit={onFormSubmit} loading={loading} />
    </Box>
  );
};

export default NewRecipe;
