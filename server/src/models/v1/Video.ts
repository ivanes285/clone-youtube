import { Schema, model } from 'mongoose';
import mongoautopopulate from 'mongoose-autopopulate';

const VideoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: true
        },
        
        title: {
            type: String,
            required: true,
            trim: true
        },
        desc: {
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
// VideoSchema.plugin(mongoautopopulate);

export default model('Video', VideoSchema);