import express from "express";
import mongoose from "mongoose";
import crypto from "node:crypto";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import User from "../models/User";
import type { UserField } from "../types";

const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/', async (req, res, next) => {
    const userData: Omit<UserField, 'token' | 'role'> = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
    };

    try {
        const user = new User(userData);
        user.generateToken();

        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send({ error: 'Username not found!' });
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Password is wrong!' });
        }

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();
        if (!payload) return res.status(400).send({ error: 'Google login error!' });

        const { email, sub: googleId, name: displayName } = payload;

        if (!email) {
            return res.status(400).send({ error: 'Not enough user data to continue!' });
        }

        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleId,
                displayName,
            });
        }

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (error) {
        next(error);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) return res.status(204).send();

        const user = await User.findOne({ token });
        if (!user) return res.status(204).send();

        user.generateToken();
        await user.save();

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default usersRouter;
