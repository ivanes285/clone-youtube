import { Schema, model } from 'mongoose';

const VideoSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        },
        likes: {
            type: [String],
            default: []
        },

        dislikes: {
            type: [String],
            default: []
        }
    },
    { timestamps: true, versionKey: false }
);

export default model('Video', VideoSchema);