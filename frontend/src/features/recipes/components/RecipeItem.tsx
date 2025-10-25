import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Avatar, Box } from '@mui/material';
import type { Recipe } from '../../../types';

interface Props {
  recipe: Recipe;
}

const RecipeItem: FC<Props> = ({ recipe }) => {
  const user = typeof recipe.user === 'string' ? null : recipe.user;

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 1.5,
        borderRadius: 3,
        border: '1px solid #ebebeb',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
        {recipe.image && (
          <CardMedia
            component="img"
            height="180"
            image={
              recipe.image.startsWith('http')
                ? recipe.image
                : `http://localhost:8000/${recipe.image}`
            }
            alt={recipe.title}
            style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
          />
        )}
        <CardContent sx={{ backgroundColor: '#fff', pb: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              color: '#333',
              fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {recipe.title}
          </Typography>
        </CardContent>
      </Link>

      {user && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            gap: 1,
            borderTop: '1px solid #ebebeb',
            backgroundColor: '#fafafa',
          }}
        >
          <Avatar
            src={
              user.avatar
                ? user.avatar.startsWith('http')
                  ? user.avatar
                  : `http://localhost:8000/${user.avatar}`
                : undefined
            }
            alt={user.displayName}
            sx={{ width: 32, height: 32 }}
          />
          <Link
            to={`/user/${user._id}`}
            style={{
              textDecoration: 'none',
              color: '#333',
              fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              fontSize: '0.9rem',
              transition: 'color 0.2s ease',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#333',
                '&:hover': { color: '#63b363', fontWeight: 600 },
              }}
            >
              by {user.displayName}
            </Typography>
          </Link>
        </Box>
      )}
    </Card>
  );
};

export default RecipeItem;
