import mongoose, { Schema, Document } from 'mongoose';
import { CommentFields } from '../types';

export interface CommentDoc extends CommentFields, Document {}

const CommentSchema = new Schema<CommentDoc>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model<CommentDoc>('Comment', CommentSchema);
