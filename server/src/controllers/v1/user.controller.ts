import { Request, Response } from 'express';
import User from '../../models/User';
import IError from '../../interfaces/IError';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import Video from '../../models/Video';

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email,password } = req.body;
        if (!email || !password || !name) {
            throw { code: 400, message: 'Email, Password or Name is empty' };
        }
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
        const hashPassword = await bcrypt.hash(password, salt);
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
        if (!email || !password) {
            throw { code: 400, message: 'Email or password is empty' };
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw { code: 400, message: 'User not found' };
        }
        const validPassword: boolean = await bcrypt.compare(
            password,
            user.password
        );
        if (!validPassword) {
            throw { code: 400, message: 'Invalid password' };
        }
        const expiresIn = 60 * 60;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn
        });
        const userFind = await User.findOne({ email }).select('-password');
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json(userFind);
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'ID inválido' };
        }
        const userFound = await User.findById(id);
        if (!userFound) {
            throw { code: 404, message: 'User not found' };
        }
        res.status(200).json(userFound);
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'ID inválido' };
        }

        if ((id as string) !== req.user.id) {
            throw { code: 403, message: 'You can update only your account' };
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        if (updateUser) {
            // res.status(200).json({ message: 'User updated' });
            res.status(200).json(updateUser);
        }
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'ID inválido' };
        }
        if ((id as string) !== req.user.id) {
            throw { code: 403, message: 'You can delete only your account' };
        }

        const userDelete = await User.findByIdAndDelete(id);

        if (!userDelete) {
            throw { code: 404, message: 'User not found' };
        }
        res.status(200).json({ message: 'User account deleted' });
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const subscribeUser = async (req: Request, res: Response) => {
    try {
        const myId = req.user.id;
        const { id } = req.params;
        //Me suscribo a un canal y guardo el id del usuario del canal

        // const add = await User.findByIdAndUpdate(myId,{$push:{suscribedUsers:id}});   //$push para agregar un elemento a un array
        const channel = await User.findById(myId);

        const add = await User.findByIdAndUpdate(
            myId,
            { $addToSet: { suscribedUsers: id } },
            { new: true }
        ); // $addToSet para agregar un elemento a un array sin repetir

        if (channel?.suscribedUsers.length === add?.suscribedUsers.length) {
            throw {
                code: 403,
                message: 'You are already suscribed to channel'
            };
        }

        //Aumento en 1 el numero de suscriptores del canal al que me suscribo
        await User.findByIdAndUpdate(id, { $inc: { suscribers: 1 } });

        res.status(200).json({ message: 'Subscription succesfull' });
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const unSubscribeUser = async (req: Request, res: Response) => {
    try {
        const myId = req.user.id;
        const { id } = req.params;
        await User.findByIdAndUpdate(myId, { $pull: { suscribedUsers: id } });
        await User.findByIdAndUpdate(id, { $inc: { suscribers: -1 } });

        res.status(200).json({ message: 'Subscription succesfull' });
    } catch (error: any) {
        //
        res.status(error.code).json({ message: error.message });
    }
};

const likeVideo = async (req: Request, res: Response) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;
         await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });

        res.status(200).json({ message: 'The video has been liked' });
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const disLikeVideo = async (req: Request, res: Response) => {
    try {
        const id = req.user.id;

        const videoId = req.params.videoId;
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json({ message: 'The video has been disliked' });
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

export {
    signup,
    signin,
    getUsers,
    updateUser,
    deleteUser,
    getUserById,
    subscribeUser,
    unSubscribeUser,
    likeVideo,
    disLikeVideo
};
