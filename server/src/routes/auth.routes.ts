import { Router} from 'express';
const router = Router();
import { signin, signup } from '../controllers/v1/auth.controller';

//create a new user
router.post('/signup', signup );

//sign in
router.post('/signin', signin );

//google auth
router.post('/google',);




export default router;
