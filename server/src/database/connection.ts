import  {connect , connection} from 'mongoose';
const MONGO_URI:string = process.env.MONGO_URI as string;


connect(MONGO_URI);

connection.once('open', () => {
    console.log('DB is connected');
});
connection.on('error', (err) => {
console.error('Mongo Connection Error',err);
process.exit(1);
});