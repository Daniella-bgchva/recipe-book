import { Stack, TextField, Button, CircularProgress, Alert, Box, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { RecipeMutation } from '../../../types';

interface Props {
  onSubmit: (data: RecipeMutation) => void;
  loading: boolean;
}

const RecipeForm = ({ onSubmit, loading }: Props) => {
  const [state, setState] = useState<RecipeMutation>({
    title: '',
    recipe: '',
    ingredients: [],
    image: undefined,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'ingredients') {
      setState((prev) => ({ ...prev, ingredients: value.split(',').map((i) => i.trim()) }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setState((prev) => ({ ...prev, image: file }));
  };

  const validate = (): boolean => {
    const errs: string[] = [];

    if (!state.title.trim()) errs.push('Title is required.');
    if (!state.recipe.trim()) errs.push('Recipe is required.');
    if (!state.image) errs.push('Image is required.');

    setErrors(errs);
    return errs.length === 0;
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) onSubmit(state);
  };

  return (
    <Box>
      <Stack component="form" spacing={2} onSubmit={submitHandler}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
          Add New Recipe
        </Typography>

        {errors.length > 0 &&
          errors.map((err, idx) => (
            <Alert severity="error" key={idx}>
              {err}
            </Alert>
          ))}

        <TextField
          label="Title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          required
          fullWidth
        />
        <TextField
          label="Recipe"
          name="recipe"
          value={state.recipe}
          onChange={inputChangeHandler}
          multiline
          minRows={4}
          required
          fullWidth
        />
        <FileInput label="Recipe Image" name="image" onChange={fileChangeHandler} />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#63b363',
            '&:hover': { backgroundColor: '#57a257' },
            borderRadius: '20px',
            mt: 1,
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Create Recipe'}
        </Button>
      </Stack>
    </Box>
  );
};

export default RecipeForm;
