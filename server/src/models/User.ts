import { model, Schema } from 'mongoose';
import mongoautopopulate from 'mongoose-autopopulate';


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
            ref: 'User',
            default: [],
            
        }
    },
    { timestamps: true, versionKey: false }
);
UserSchema.plugin(mongoautopopulate);
export default model('User', UserSchema);
