import { AppBar, Toolbar, Typography, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UsersMenu';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  const StyledLink = styled(Link)({
    color: '#333333',
    textDecoration: 'none',
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 600,
    fontSize: 16,
    '&:hover': {
      color: '#63b363',
    },
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EBEBEB', mb: 2 }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
        <Typography variant="h6">
          <StyledLink to="/">Recipe Book</StyledLink>
        </Typography>
        <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
