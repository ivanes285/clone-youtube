import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import RoutesV1 from './routes/index';

dotenv.config();
const app: Application = express();

const CorsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

//TODO:No poner esta linea una vez que se actualice mongoose a la version 7
mongoose.set('strictQuery', true); //advertencia para notificar sobre el cambio que se hara en mongoose 7

//Midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(CorsOptions));



//Routes
RoutesV1(app);



//Database
import './database/connection';

export { app };

