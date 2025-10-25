import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Recipes from './features/recipes/components/Recipes.tsx';
import UserRecipes from './features/recipes/components/UserRecipes.tsx';
import NewRecipe from './features/recipes/components/NewRecipe.tsx';
import MyRecipes from './features/recipes/components/MyRecipes.tsx';
import RecipePage from './features/recipes/components/RecipePage.tsx';

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
          <Route path="/" element={<Recipes />} />
          <Route path="/recipes/new" element={<NewRecipe />} />
          <Route path="/mine" element={<MyRecipes />} />
          <Route path="/user/:id" element={<UserRecipes />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="*" element={<Typography>Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
