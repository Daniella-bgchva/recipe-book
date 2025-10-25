import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Link } from 'react-router-dom';
import { selectMyRecipes, selectMyRecipesLoading } from '../recipesSlice';
import RecipeList from './RecipeList';
import { fetchMyRecipes, deleteRecipe } from '../recipesThunk';

const MyRecipes = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectMyRecipes);
  const loading = useAppSelector(selectMyRecipesLoading);

  useEffect(() => {
    void dispatch(fetchMyRecipes());
  }, [dispatch]);

  const deleteRecipeHandler = async (recipeId: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    const result = await dispatch(deleteRecipe(recipeId));

    if (result.meta.requestStatus === 'fulfilled') {
      void dispatch(fetchMyRecipes());
    }
  };

  return (
    <Box sx={{ mt: 3, px: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#333">
          My recipes
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to="/recipes/new"
          sx={{
            borderRadius: '20px',
            backgroundColor: '#63b363',
            '&:hover': { backgroundColor: '#57a257' },
          }}
        >
          Add Recipe
        </Button>
      </Box>

      <RecipeList
        recipes={recipes}
        loading={loading}
        isAuthor={true}
        onDelete={deleteRecipeHandler}
      />
    </Box>
  );
};

export default MyRecipes;
