import { Application } from "express";
import CommentRoutes from './comment.routes';
import UserRoutes from './user.routes';
import VideoRoutes from './video.routes';
import AuthRoutes from './auth.routes';



const RoutesV1 = (app: Application):void=>{
    app.use("/api/v1/auth",AuthRoutes);
    app.use("/api/v1/users",UserRoutes );
    app.use("/api/v1/videos",VideoRoutes );
    app.use("/api/v1/comments",CommentRoutes );
    
}

export default RoutesV1;