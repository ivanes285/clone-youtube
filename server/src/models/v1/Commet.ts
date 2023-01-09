import { Schema, model } from 'mongoose';

const VideoSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        videoId: {
         type: String,
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