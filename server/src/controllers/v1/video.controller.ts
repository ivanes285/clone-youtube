import { Request, Response } from 'express';
import Video from '../../models/Video';
import IError from '../../interfaces/IError';
import { Types } from 'mongoose';
import User from '../../models/User';

const createVideo = async (req: Request, res: Response) => {
    try {
        const id = req.user.id;
        const newVideo = new Video({ userId: id, ...req.body });
        const videoSaved = await newVideo.save();
        res.status(200).json(videoSaved);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const updateVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'Invalid id' };
        }

        const video = await Video.findById(id);
        if (!video) {
            throw { code: 404, message: 'Video not found' };
        }

        if (req.user.id !== video.userId) {
            throw { code: 404, message: 'You can update only your videos' };
        }

        const updateVideo = await Video.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        if (updateVideo) {
            res.status(200).json(updateVideo);
        }
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const deleteVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'Invalid id' };
        }

        const video = await Video.findById(id);
        if (!video) {
            throw { code: 404, message: 'Video not found' };
        }
        const videoDeleted = await Video.findByIdAndDelete(id);
        if (videoDeleted) {
            res.status(200).json({ message: 'Video deleted' });
        }
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const getVideoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'Invalid id' };
        }
        const video = await Video.findById(id);
        if (!video) {
            throw { code: 404, message: 'Video not found' };
        }
        res.status(200).json(video);
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const allVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find()
        res.status(200).json(videos);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const getVideos = async (req: Request, res: Response) => {
    try {
        const id = req.user.id;
        const videos = await Video.find({ userId: id });

        if (videos.length === 0) {
            throw { code: 404, message: 'you dont have videos' };
        }
        res.status(200).json(videos);
    } catch (error: any) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const addView = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) {
            throw { code: 400, message: 'Invalid id' };
        }
        const incre = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        if (incre) {
            res.status(200).json({ message: 'The view has been increased.' });
        }
    } catch (error) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

const random = async (req: Request, res: Response) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const trend = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find().sort({ views: -1 }); // -1 descendente es decir de mayor a menor views
        res.status(200).json(videos);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const sub = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        const suscribedUsers = user!.suscribedUsers;

        //Retorna todos los videos de los canales a los cuales me suscribí
        const list = await Promise.all(
            suscribedUsers.map((chanelId) => {
                return Video.find({ userId: chanelId }).sort({ createdAt: 1 });
            })
        );
        res.status(200).json(list.flat());
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const getByTag = async (req: Request, res: Response) => {
    try {
       
        const tags =(req.query.tags as string).split(',');
        const videos = await Video.find({tags:{$in:tags}}).limit(20) // -1 descendente es decir de mayor a menor views
        res.status(200).json(videos);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const search = async (req: Request, res: Response) => {
    try {
        const search =req.query.q;
        const videos = await Video.find({title:{$regex:search, $options:'i'}}).limit(40); // -1 descendente es decir de mayor a menor views
        res.status(200).json(videos);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

export {
    allVideos,
    createVideo,
    updateVideo,
    deleteVideo,
    getVideoById,
    getVideos,
    addView,
    random,
    trend,
    sub,
    getByTag,
    search
};
