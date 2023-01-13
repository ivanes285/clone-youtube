import { Schema, model } from 'mongoose';

const VideoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        videoId: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

export default model('Comment', VideoSchema);
