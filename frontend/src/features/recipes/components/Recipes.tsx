import { type FC, useEffect } from 'react';
import { Box, CircularProgress, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { fetchRecipes } from '../recipesThunk.ts';
import RecipeItem from './RecipeItem.tsx';
import { selectRecipes, selectRecipesLoading } from '../recipesSlice.ts';

const Recipes: FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectRecipesLoading);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Recipes</Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : recipes.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No recipes found
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
          }}
        >
          {recipes.map((recipe) => (
            <Box
              key={recipe._id}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 16px)',
                  md: 'calc(33.333% - 16px)',
                  lg: 'calc(25% - 16px)',
                },
              }}
            >
              <RecipeItem recipe={recipe} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Recipes;
