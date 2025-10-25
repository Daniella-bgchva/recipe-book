import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";


const App = () => {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Container maxWidth="xl" component="main">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Typography>Not found</Typography>} />
                </Routes>
            </Container>
        </>
    );
};

export default App;