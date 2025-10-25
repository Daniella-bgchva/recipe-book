import { Button, Box} from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 2 }}>
            <Button component={NavLink} to={'/register'}
                    sx={{
                        backgroundColor: '#63b363',
                        color: '#fff',
                        borderRadius: 8,
                        mr: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#a0e36c',
                        },}}
            >
                Sign Up
            </Button>
            <Button component={NavLink} to={'/login'}   sx={{
                backgroundColor: '#63b363',
                color: '#fff',
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                    backgroundColor: '#a0e36c',
                },}}>
                Sign In
            </Button>
        </Box>
    );
};

export default AnonymousMenu;
