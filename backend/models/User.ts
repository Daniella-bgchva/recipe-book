import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { UserField } from '../types';

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserField, {}, UserMethods>;

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserField, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: [true, 'Display Name is required'],
        trim: true,
    },
    avatar: String,
    googleId: String,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret: Partial<UserField>) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

const User = mongoose.model<UserField, UserModel>('User', UserSchema);
export default User;