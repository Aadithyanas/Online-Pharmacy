import express from 'express'
import MongoDB from './config/config.db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/authroutes.js'
import cors from "cors"
dotenv.config()
MongoDB()
const app = express()
app.use(express.json())
app.use(cors())



app.use("/api/auth", authRoutes);

const PORT = 3000;
 app.listen(PORT,()=>console.log("Now server runinng"))