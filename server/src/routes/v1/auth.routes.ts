import { Router} from 'express';
const router = Router();
import { googleGitAuth } from '../../controllers';

router.post('/google', googleGitAuth);


export default router;
