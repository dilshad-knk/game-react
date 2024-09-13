import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import scoreRoutes from './routes/scoreRouter.js'
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();


connectDb();

app.use(cors({
    credentials: true ,
    origin: "http://127.0.0.1:5173"
}));


app.use(express.json());
app.use(cookieParser());


app.use('/api/v1', userRoutes);
app.use('/api/v1', scoreRoutes);




app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`);
});


