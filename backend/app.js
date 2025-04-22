import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB} from './config/db.js'
import gymRouter from './routers/gym.router.js';
dotenv.config();
const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(cors());
app.use("/exercises", gymRouter );


app.listen(port, () => {
    connectDB();
    console.log(`Server is listening on port https://localhost:${port}`);
});