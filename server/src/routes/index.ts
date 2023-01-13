import { Application } from "express";
import CommentRoutes from './v1/comment.routes';
import UserRoutes from './v1/user.routes';
import VideoRoutes from './v1/video.routes';
import AuthRoutes from './v1/auth.routes';



const RoutesV1 = (app: Application):void=>{
    app.use("/api/v1/auth",AuthRoutes);
    app.use("/api/v1/users",UserRoutes );
    app.use("/api/v1/videos",VideoRoutes );
    app.use("/api/v1/comments",CommentRoutes );
    
}

export default RoutesV1;