import { Request, Response } from 'express';
import Comment from '../../models/Comment';
import Video from '../../models/Video';
import IError from '../../interfaces/IError';

const createComment = async (req: Request, res: Response) => {
    try {
        const newComment = new Comment({ userId: req.user.id, ...req.body });
        const commentSave = await newComment.save();
        res.status(200).json(commentSave);
    } catch (error: any) {
        res.status(error.code).json({ message: error.message });
    }
};

const getComments = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const comments = await Comment.find({ videoId });
        res.status(200).json(comments);
    } catch (error: any) { 
        res.status(error.code).json({ message: error.message });
    }
};


const deleteComment = async (req: Request, res: Response) => {
    try {
        const commentDelete = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (
            req.user.id === commentDelete?.userId ||
            req.user.id === video?.userId
        ) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Comment deleted' });
        } else {
            throw { code: 401, message: 'You can delete only your comment' };
        }
    } catch (error: any) {
        const typedError = error as IError;
        res.status(typedError.code).json({ message: typedError.message });
    }
};

export { createComment, getComments, deleteComment };
