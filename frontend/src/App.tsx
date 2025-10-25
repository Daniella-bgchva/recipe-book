import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Container maxWidth="xl" component="main">
                <Routes>
                    <Route path="*" element={<Typography>Not found</Typography>} />
                </Routes>
            </Container>
        </>
    );
};

export default App;