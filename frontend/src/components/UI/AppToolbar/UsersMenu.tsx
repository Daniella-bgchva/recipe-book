import type { User } from '../../../types';
import { type FC, useState, type MouseEvent } from 'react';
import { Button, Menu, MenuItem, Box, Avatar } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../features/users/usersThunk.ts';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../constants.ts';

interface Props {
  user: User;
}

const UserMenu: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          src={
            user.avatar
              ? user.avatar.startsWith('http')
                ? user.avatar
                : `${API_URL}/${user.avatar}`
              : undefined
          }
          alt={user.displayName}
          sx={{ width: 36, height: 36, border: '2px solid #d7ccc8' }}
        />
        <Button
          onClick={handleClick}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: '#333',
            '&:hover': { color: '#63b363' },
          }}
        >
          Welcome, {user.displayName}!
        </Button>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to={`/mine`} onClick={handleClose}>
          My Recipes
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem
          component={Link}
          to="/recipes/new"
          sx={{
            backgroundColor: '#63b363',
            color: '#fff',
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#a0e36c',
            },
          }}
        >
          Add Recipe
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
