import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectAuthorRecipes,
  selectAuthorRecipesLoading,
  selectDeleteRecipeLoading,
} from '../recipesSlice';
import { selectUser } from '../../users/usersSlice';
import RecipeList from './RecipeList';
import { deleteRecipe, fetchRecipesByUser } from '../recipesThunk';

const UserRecipes = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectAuthorRecipes);
  const loading = useAppSelector(selectAuthorRecipesLoading);
  const deleting = useAppSelector(selectDeleteRecipeLoading);
  const user = useAppSelector(selectUser);

  const isAuthor = user?._id === id;

  useEffect(() => {
    if (id) void dispatch(fetchRecipesByUser(id));
  }, [dispatch, id]);

  const deleteRecipeHandler = async (recipeId: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    const result = await dispatch(deleteRecipe(recipeId));
    if (result.meta.requestStatus === 'fulfilled' && id) {
      void dispatch(fetchRecipesByUser(id));
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
          {isAuthor
            ? 'My recipes'
            : `Recipes by ${recipes[0] && typeof recipes[0].user !== 'string' ? recipes[0].user.displayName : ''}`}
        </Typography>

        {isAuthor && (
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
        )}
      </Box>

      <RecipeList
        recipes={recipes}
        loading={loading || deleting}
        isAuthor={isAuthor}
        onDelete={deleteRecipeHandler}
      />
    </Box>
  );
};

export default UserRecipes;
