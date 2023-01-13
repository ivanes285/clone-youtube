import {Router} from 'express';
import { Auth } from '../../middlewares/auth.middleware';
import { createComment, deleteComment, getComments} from '../../controllers/v1/comment.controller';
const router = Router();
 
router.post('/',Auth, createComment )   
router.delete('/:id',Auth, deleteComment)  
router.get('/:videoId',Auth, getComments)  


export default router;