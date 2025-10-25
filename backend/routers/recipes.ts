import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import Recipe from '../models/Recipe';
import { imagesUpload } from '../multer';
import { RequestWithUser } from '../types';
import Comment from '../models/Comment';

const recipesRouter = express.Router();

recipesRouter.get('/', async (_req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'displayName avatar');
    res.send(recipes);
  } catch (e) {
    res.sendStatus(500);
  }
});

recipesRouter.get('/mine', auth, async (req, res) => {
  try {
    const userReq = req as RequestWithUser;
    const recipes = await Recipe.find({ user: userReq.user._id }).populate(
      'user',
      'displayName avatar',
    );
    res.send(recipes);
  } catch (e) {
    console.error('Error fetching user recipes:', e);
    res.sendStatus(500);
  }
});

recipesRouter.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'displayName avatar');
    if (!recipe) return res.status(404).send({ error: 'Recipe not found' });
    res.send(recipe);
  } catch (e) {
    res.sendStatus(500);
  }
});

recipesRouter.post('/', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const userReq = req as RequestWithUser;
    const title = req.body.title?.trim();
    const recipe = req.body.recipe?.trim();
    const image = req.file?.filename;

    if (!title) return res.status(400).send({ error: 'Title is required' });
    if (!recipe) return res.status(400).send({ error: 'Description is required' });
    if (!image) return res.status(400).send({ error: 'Image is required' });

    const recipeFields = new Recipe({
      user: userReq.user._id,
      title,
      recipe,
      image,
    });

    await recipeFields.save();
    res.status(201).send(recipeFields);
  } catch (e) {
    console.error('Error creating recipe:', e);
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: e.message });
    }
    res.status(500).send({ error: 'Server error', details: e });
  }
});

recipesRouter.delete('/:id', auth, async (req, res) => {
  const userReq = req as RequestWithUser;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send({ error: 'Recipe not found' });

    if (!recipe.user.equals(userReq.user._id)) {
      return res.status(403).send({ error: 'Unauthorized' });
    }

    await recipe.deleteOne();
    res.sendStatus(204);
  } catch (e) {
    console.error('Error deleting recipe:', e);
    res.sendStatus(500);
  }
});

recipesRouter.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.id }).populate(
      'user',
      'displayName avatar',
    );
    res.send(comments);
  } catch {
    res.sendStatus(500);
  }
});

recipesRouter.post('/:id/comments', auth, async (req, res) => {
  try {
    const userReq = req as RequestWithUser;

    const text = req.body.text?.trim();
    if (!text) return res.status(400).send({ error: 'Comment text is required' });

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send({ error: 'Recipe not found' });

    const comment = new Comment({
      user: userReq.user._id,
      recipe: recipe._id,
      text,
    });

    await comment.save();
    res.status(201).send(comment);
  } catch {
    res.sendStatus(500);
  }
});

export default recipesRouter;
