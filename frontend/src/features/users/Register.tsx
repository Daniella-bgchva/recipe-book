import { type ChangeEvent, type FormEvent, useState } from 'react';
import type { RegisterMutation } from '../../types';
import { Avatar, Box, Button, Link, Stack, TextField, Typography, Paper } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import { register } from './usersThunk';

const GreenButton = {
  backgroundColor: '#63b363',
  color: '#fff',
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 600,
  fontFamily: 'Inter, Roboto, Helvetica Neue, Arial, sans-serif',
  '&:hover': {
    backgroundColor: '#a0e36c',
  },
};

const Register = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    avatar: '',
  });

  const getFieldError = (fieldName: string) => error?.errors?.[fieldName]?.message;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      const noSpaces = value.replace(/\s/g, '');
      setState((prev) => ({ ...prev, [name]: noSpaces }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: '#63b363' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontFamily: 'Inter, Roboto, Helvetica Neue, Arial, sans-serif',
              fontWeight: 600,
              color: '#333',
            }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={submitFormHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Stack spacing={2}>
              <TextField
                required
                label="Username"
                name="username"
                value={state.username}
                onChange={inputChangeHandler}
                autoComplete="new-username"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
                sx={{
                  backgroundColor: '#f5fdf5',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#a0e36c' },
                    '&:hover fieldset': { borderColor: '#63b363' },
                    '&.Mui-focused fieldset': { borderColor: '#4a9a4a' },
                  },
                }}
              />
              <TextField
                type="password"
                required
                label="Password"
                name="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
                sx={{
                  backgroundColor: '#f5fdf5',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#a0e36c' },
                    '&:hover fieldset': { borderColor: '#63b363' },
                    '&.Mui-focused fieldset': { borderColor: '#4a9a4a' },
                  },
                }}
              />
              <TextField
                required
                label="Display Name"
                name="displayName"
                value={state.displayName || ''}
                onChange={inputChangeHandler}
                autoComplete="name"
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
                sx={{
                  backgroundColor: '#f5fdf5',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#a0e36c' },
                    '&:hover fieldset': { borderColor: '#63b363' },
                    '&.Mui-focused fieldset': { borderColor: '#4a9a4a' },
                  },
                }}
              />
              <TextField
                label="Avatar URL"
                name="avatar"
                value={state.avatar || ''}
                onChange={inputChangeHandler}
                sx={{
                  backgroundColor: '#f5fdf5',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#a0e36c' },
                    '&:hover fieldset': { borderColor: '#63b363' },
                    '&.Mui-focused fieldset': { borderColor: '#4a9a4a' },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={GreenButton}
                disabled={loading}
              >
                Sign Up
              </Button>
            </Stack>
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {error.errors?.message || error.errors.message}
              </Typography>
            )}
          </Box>

          <Link
            component={RouterLink}
            to="/login"
            sx={{
              mt: 2,
              color: '#63b363',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Already have an account? Sign in
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
