import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import lodash from 'lodash'
import hotelsRoutes from './routes/hotels.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import roomsRoutes from './routes/rooms.js'
import usersRoutes from './routes/users.js'
import cors from 'cors'
const PORT=8000||process.env.PORT;
const app = express();
dotenv.config();
const connect = async() => {

    try{

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database");
    } catch(err) {
        throw err;
    }
}
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api/hotels', hotelsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/user', usersRoutes);

app.get('/', (req,res)=>{
    res.send(`Server running on web port ${PORT}`)
})
app.listen(PORT, () => {
    connect();
    console.log(`Server started at ${PORT}`);
});