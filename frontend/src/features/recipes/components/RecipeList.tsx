import { type FC } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import RecipeItem from './RecipeItem';
import type { Recipe } from '../../../types';

interface Props {
  recipes: Recipe[];
  loading: boolean;
  isAuthor?: boolean;
  onDelete?: (id: string) => void;
}

const RecipeList: FC<Props> = ({ recipes, loading, isAuthor, onDelete }) => {
  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

  return (
    <Grid container spacing={2}>
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
          <RecipeItem
            recipe={recipe}
            isAuthor={isAuthor}
            onDelete={onDelete ? () => onDelete(recipe._id) : undefined}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default RecipeList;
