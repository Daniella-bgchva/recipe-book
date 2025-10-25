import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { fetchCommentsByRecipe, addComment, deleteComment } from '../../comments/commentsThunk';
import {
  selectAddLoading,
  selectComments,
  selectDeleteLoading,
  selectFetchLoading,
} from '../../comments/commentsSlice.ts';
import { selectOneRecipe, selectOneRecipeLoading } from '../recipesSlice.ts';
import type { User } from '../../../types';
import { fetchOneRecipe } from '../recipesThunk.ts';
import { API_URL } from '../../../constants.ts';

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const recipe = useAppSelector(selectOneRecipe);
  const recipeLoading = useAppSelector(selectOneRecipeLoading);

  const comments = useAppSelector(selectComments);
  const fetchCommentsLoading = useAppSelector(selectFetchLoading);
  const addCommentLoading = useAppSelector(selectAddLoading);
  const deleteCommentLoading = useAppSelector(selectDeleteLoading);

  const [text, setText] = useState('');

  const recipeUser: User | null = recipe && typeof recipe.user !== 'string' ? recipe.user : null;
  const isAuthor = user?._id && recipeUser?._id ? user._id === recipeUser._id : false;

  useEffect(() => {
    if (id) {
      void dispatch(fetchOneRecipe(id));
      void dispatch(fetchCommentsByRecipe(id));
    }
  }, [dispatch, id]);

  const addCommentHandler = async () => {
    if (!text.trim() || !id) return;
    await dispatch(addComment({ recipeId: id, text }));
    setText('');
    void dispatch(fetchCommentsByRecipe(id));
  };

  const deleteCommentHandler = async (commentId: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    await dispatch(deleteComment(commentId));
    void dispatch(fetchCommentsByRecipe(id));
  };

  if (recipeLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

  return (
    <Box sx={{ mt: 4, px: 2, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        <Typography variant="h5" fontWeight={700} mb={2} color="#000">
          {recipe?.title}
        </Typography>

        {recipe?.image && (
          <Box
            sx={{
              mb: 3,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              maxHeight: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={recipe.image.startsWith('http') ? recipe.image : `${API_URL}/${recipe.image}`}
              alt={recipe.title}
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}

        <Typography variant="body1" mb={3} sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
          {recipe?.recipe}
        </Typography>

        {recipeUser && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={
                recipeUser.avatar
                  ? recipeUser.avatar.startsWith('http')
                    ? recipeUser.avatar
                    : `${API_URL}/${recipeUser.avatar}`
                  : undefined
              }
              alt={recipeUser.displayName}
              sx={{ mr: 2, width: 48, height: 48 }}
            >
              {!recipeUser.avatar && recipeUser.displayName[0].toUpperCase()}
            </Avatar>
            <Typography variant="subtitle1" fontWeight={500} color="text.secondary">
              by {recipeUser.displayName}
            </Typography>
          </Box>
        )}

        <Typography variant="h6" fontWeight={900} mb={2}>
          Comments
        </Typography>

        {fetchCommentsLoading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 2 }} />
        ) : comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            No comments yet
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {comments.map((c) => {
              const canDelete = user?._id === c.user._id || isAuthor;
              return (
                <Paper key={c._id} sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {c.user.displayName}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-line' }}>
                        {c.text}
                      </Typography>
                    </Box>
                    {canDelete && (
                      <Button
                        size="small"
                        sx={{
                          backgroundColor: '#63b363',
                          color: '#fff',
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: '#a0e36c',
                          },
                        }}
                        onClick={() => deleteCommentHandler(c._id)}
                        disabled={deleteCommentLoading}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </Paper>
              );
            })}
          </Box>
        )}

        {user && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              fullWidth
              multiline
              minRows={2}
              sx={{ borderRadius: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#63b363',
                color: '#fff',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 200,
                '&:hover': { backgroundColor: '#a0e36c' },
              }}
              onClick={addCommentHandler}
              disabled={addCommentLoading}
            >
              {addCommentLoading ? '...' : 'Send'}
            </Button>
          </Box>
        )}

        <Divider sx={{ mt: 4 }} />
      </Box>
    </Box>
  );
};

export default RecipePage;
