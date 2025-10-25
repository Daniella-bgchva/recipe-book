import mongoose from 'mongoose';
import User from './User';
import { RecipeFields } from '../types';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema<RecipeFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
  },
  recipe: {
    type: String,
    required: [true, 'Recipe description is required'],
  },
  image: {
    type: String,
    required: [true, 'Recipe image is required'],
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
