import { Router } from 'express';
const router = Router();
import {
    deleteUser,
    disLikeVideo,
    getUserById,
    getUsers,
    likeVideo,
    signin,
    signup,
    subscribeUser,
    unSubscribeUser,
    updateUser
} from '../../controllers';
import { Auth } from '../../middlewares/auth.middleware';

//create a new user
router.post('/signup', signup);

//sign in
router.post('/signin', signin);

//google auth
router.post('/google');

//get Users
router.get('/', getUsers);

//update user
router.put('/:id', Auth, updateUser);

//delete user
router.delete('/:id', Auth, deleteUser);


//get user by id
router.get('/:id', getUserById);


//subscribe user
router.put('/sub/:id', Auth, subscribeUser);


//unsubscribe user
router.put('/unsub/:id', Auth, unSubscribeUser);


//like a video
router.put('/like/:videoId', Auth, likeVideo);


//dislike a video
router.put('/dislike/:videoId', Auth, disLikeVideo);



export default router;
