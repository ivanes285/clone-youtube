import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        suscribers: {
            type: Number,
            default: 0
        },
        suscribedUsers: {
            type:[Schema.Types.ObjectId],
            unique: true,
            default: [],
            
            ref: 'Video',
            
        }
    },
    { timestamps: true, versionKey: false }
);

export default model('User', UserSchema);
