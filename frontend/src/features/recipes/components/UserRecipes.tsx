import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, CircularProgress, Grid, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuthorRecipes, selectAuthorRecipesLoading } from '../recipesSlice';
import { selectUser } from '../../users/usersSlice';
import RecipeItem from './RecipeItem';
import { fetchRecipesByUser } from '../recipesThunk.ts';

const UserRecipes = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const recipes = useAppSelector(selectAuthorRecipes);
    const loading = useAppSelector(selectAuthorRecipesLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (id) {
            void dispatch(fetchRecipesByUser(id));
        }
    }, [dispatch, id]);

    const isAuthor = user && user._id === id;

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
                    {isAuthor ? 'My recipes' : "Author's recipes"}
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

            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />
            ) : (
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
                            <RecipeItem recipe={recipe} />
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default UserRecipes;
