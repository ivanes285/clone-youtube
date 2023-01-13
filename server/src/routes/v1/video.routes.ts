import { Router } from 'express';
import {
    createVideo,
    updateVideo,
    deleteVideo,
    getVideoById,
    getVideos,
    addView,
    random,
    trend,
    sub,
    allVideos,
    getByTag,
    search
} from '../../controllers/v1/video.controller';
const router = Router();
import { Auth } from '../../middlewares/auth.middleware';


//Get all videos for id
router.get('/', Auth, getVideos);

//Get all videos
router.get('/all', allVideos);

//get random videos
 router.get('/random', random);

//get all videos by views
 router.get('/trend', trend);


//get a video
 router.get('/find/:id', Auth, getVideoById);
 
 router.get('/tags', getByTag);

//Create a new video
router.post('/', Auth, createVideo);

//get all videos by user
router.get('/sub', Auth, sub);


router.get('/search', search);

// update a video
router.put('/:id', Auth, updateVideo);


//add view
router.put('/view/:id', addView);

//delete a video
router.delete('/:id', Auth, deleteVideo);


export default router;
