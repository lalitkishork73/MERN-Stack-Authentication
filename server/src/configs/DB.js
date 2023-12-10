import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.MONGOOSE_KEY;

async function Mongoose(database) {

    mongoose.connect(`${KEY}${database}`, { retryWrites: true, w: 'majority' }).then(() => {
        console.log('mongoose connected');
    }).catch(err => {
        console.error(err);
    });
}
export default Mongoose;