import express from 'express';
import cors from 'cors';
import route from './routes/route.js';
import Mongoose from './configs/DB.js';
const app = express();
const port = 3000;



// middleware

app.use(express.json());
app.use(cors());

Mongoose("AuthData");

app.use('/', route);



app.listen(process.env.PORT || port, () => {
    console.log(`listening on ${process.env.PORT || port}`);
});