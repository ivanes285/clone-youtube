import {Router } from 'express';
import { createVideo,updateVideo,deleteVideo, getVideoById, getVideos,addView,random, trend,sub,allVideos } from '../controllers/v1/video.controller';
const router = Router();
import { Auth } from '../middlewares/auth.middleware';

//get all videos by user
router.get('/sub',Auth, sub) 

//Get all videos
router.get('/all',allVideos)

//Get all videos for id
router.get('/',Auth,getVideos)

//Create a new video
router.post('/',Auth,createVideo)

// update a video
router.put('/:id',Auth,updateVideo)

//delete a video
router.delete('/:id',Auth,deleteVideo)

//get a video 
router.get('/:id',Auth,getVideoById)


//add view
router.put('/view/:id',addView)


//get all videos by views
router.get('/trend',trend)

//get random videos
router.get('/random',random)






export default router;