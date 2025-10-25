import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Recipe from './models/Recipe';
import Comment from './models/Comment';
import { randomUUID } from 'node:crypto';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('recipes');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [tim, lisa] = await User.create(
    {
      username: 'tim',
      displayName: 'Tim',
      avatar: 'fixtures/tim.png',
      password: 'Qwerty123',
      token: randomUUID(),
    },
    {
      username: 'lisa',
      displayName: 'Lisa',
      avatar: 'fixtures/lisa.png',
      password: 'Qwerty123',
      token: randomUUID(),
    },
  );

  const [carbonara, pancakes, grilledCheese, caesarSalad] = await Recipe.create(
    {
      user: tim._id,
      title: 'Spaghetti Carbonara',
      recipe: 'Boil pasta, cook bacon, mix with eggs and cheese.',
      image: 'fixtures/carbonara.jpg',
    },
    {
      user: tim._id,
      title: 'Chicken Salad',
      recipe: 'Mix chicken, lettuce, tomato, cucumber, and dressing.',
      image: 'fixtures/chicken_salad.jpg',
    },
    {
      user: tim._id,
      title: 'Pancakes',
      recipe: 'Mix flour, milk, eggs, cook on pan, serve with syrup.',
      image: 'fixtures/pancakes.jpg',
    },
    {
      user: tim._id,
      title: 'Tomato Soup',
      recipe: 'Cook tomatoes, blend, add cream and spices.',
      image: 'fixtures/tomato_soup.jpg',
    },
    {
      user: lisa._id,
      title: 'Grilled Cheese Sandwich',
      recipe: 'Place cheese between bread slices, grill until golden.',
      image: 'fixtures/grilled_cheese.jpg',
    },
    {
      user: lisa._id,
      title: 'Caesar Salad',
      recipe: 'Mix lettuce, croutons, parmesan, and Caesar dressing.',
      image: 'fixtures/caesar_salad.jpg',
    },
    {
      user: lisa._id,
      title: 'Fruit Smoothie',
      recipe: 'Blend banana, berries, yogurt, and honey.',
      image: 'fixtures/fruit_smoothie.jpg',
    },
    {
      user: lisa._id,
      title: 'Omelette',
      recipe: 'Beat eggs, cook on pan with vegetables and cheese.',
      image: 'fixtures/omelette.jpg',
    },
  );

  await Comment.create(
    {
      user: lisa._id,
      recipe: carbonara._id,
      text: 'Tried this recipe, turned out amazing!',
    },
    {
      user: tim._id,
      recipe: grilledCheese._id,
      text: 'So simple and tasty, loved it!',
    },
    {
      user: lisa._id,
      recipe: pancakes._id,
      text: 'My kids loved these pancakes!',
    },
    {
      user: tim._id,
      recipe: caesarSalad._id,
      text: 'Classic and delicious!',
    },
  );

  console.log('Fixtures created with users, recipes, and comments!');
  await db.close();
};

run().catch(console.error);
