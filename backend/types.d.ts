import {Request} from "express";
import {HydratedDocument} from "mongoose";

export interface UserField {
    username: string;
    password: string;
    token: string;
    displayName: string;
    avatar?: string;
    googleId?: string;
}

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserField>
}

export interface RecipeFields {
    user: mongoose.Types.ObjectId;
    title: string;
    recipe: string;
    image: string;
}