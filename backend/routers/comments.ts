import express from 'express';
import auth from '../middleware/auth';
import Recipe from '../models/Recipe';
import Comment from '../models/Comment';
import { RequestWithUser } from '../types';

const commentsRouter = express.Router();

commentsRouter.delete('/:id', auth, async (req, res) => {
  try {
    const userReq = req as RequestWithUser;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send({ error: 'Comment not found' });

    const recipe = await Recipe.findById(comment.recipe);
    if (!recipe) return res.status(404).send({ error: 'Recipe not found' });

    if (!comment.user.equals(userReq.user._id) && !recipe.user.equals(userReq.user._id)) {
      return res.status(403).send({ error: 'Unauthorized' });
    }

    await comment.deleteOne();
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

export default commentsRouter;
