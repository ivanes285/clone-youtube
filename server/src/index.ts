import {app} from './server';
import colors from 'colors';


app.listen(4000, () => {
    console.log(  `Server is running on port ${process.env.PORT}  ${colors.blue('http://localhost:4000/api/v1/') } `);
    });