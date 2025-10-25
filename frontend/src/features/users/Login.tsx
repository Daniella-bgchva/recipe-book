import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading } from './usersSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import type { LoginMutation } from '../../types';
import { googleLogin, login } from './usersThunk';
import { Avatar, Box, Button, Link, Stack, TextField, Typography, Paper } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';

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

const Login = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoginLoading);
    const error = useAppSelector(selectLoginError);
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'password') {
            setState((prev) => ({ ...prev, [name]: value.replace(/\s/g, '') }));
        } else {
            setState((prev) => ({ ...prev, [name]: value }));
        }
    };

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login(state)).unwrap();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            await dispatch(googleLogin(credentialResponse.credential)).unwrap();
            navigate('/');
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
                        Sign In
                    </Typography>

                    {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {error.error}
                        </Typography>
                    )}

                    <Box sx={{ pt: 2 }}>
                        <GoogleLogin onSuccess={googleLoginHandler} />
                    </Box>

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
                                autoComplete="current-username"
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
                                autoComplete="current-password"
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
                            <Button type="submit" fullWidth variant="contained" sx={GreenButton} disabled={loading}>
                                Sign In
                            </Button>
                        </Stack>
                    </Box>

                    <Link
                        component={RouterLink}
                        to="/register"
                        sx={{
                            mt: 2,
                            color: '#63b363',
                            fontWeight: 500,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        Don’t have an account yet? Register
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
