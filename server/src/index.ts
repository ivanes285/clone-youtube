import {app} from './server';
import colors from 'colors';


app.listen(app.get("PORT"), () => {
    console.log(  `Server is running on port ${app.get("PORT")}  ${colors.blue('http://localhost:4000/api/v1/') } `);
    });