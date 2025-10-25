import express from 'express';
import cors from 'cors';
import usersRouter from "./routers/users";
import config from "./config";
import mongoose from "mongoose";
import recipesRouter from "./routers/recipes";
import commentsRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/recipes', recipesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
};

run().catch(console.error);