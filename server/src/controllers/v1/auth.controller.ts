import { Request, Response } from 'express';
import User from '../../models/v1/User';
import bcrypt from 'bcrypt';
import IError from '../../interfaces/IError';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const existUser = await User.findOne({ name });
        const existEmail = await User.findOne({ email });
        if (existUser) {
            throw {
                code: 400,
                message: 'Name already exist please use another '
            };
        }
        if (existEmail) {
            throw {
                code: 400,
                message: 'Email already exist please use another'
            };
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created' });
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw {
                code: 400,
                message: 'User not found'
            };
        }
        const validPassword: boolean = await bcrypt.compare(
            password,
            user.password
        );
        if (!validPassword) {
            throw {
                code: 400,
                message: 'Invalid password'
            };
        }
        const expiresIn = 60 * 60;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn
        });
        const userFind = await User.findOne({ email }).select('-password');
        res.status(200).cookie('acces_token', token, { httpOnly: true, maxAge: expiresIn }).json(userFind);
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

export { signup, signin };
