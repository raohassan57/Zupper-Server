import "dotenv/config";
import express from 'express';
import connectDB from './db/index.js';
import errorMiddleware from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import { v2 as cloudinary} from 'cloudinary';
import { corsOptions } from './constants/config.js';
import indexRouter  from './routes/index.routes.js';
import setupSocket from './socket/index.js'
import {  createGroupChats,
  createMessages,
  createMessagesInAChat,
  createSingleChats,
} from './seeders/chat.js'
// dotenv.config({
//   path: "./.env",
// });


const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";
const userSocketIDs = new Map();
const onlineUsers = new Set();

connectDB(mongoURI);


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

// Using Middlewares Here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/',(req, res)=>{
  res.send("Server is up and running");
})


app.use("/api/v1", indexRouter);



setupSocket(io);





app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} Mode`);
});


export { envMode, adminSecretKey, userSocketIDs, onlineUsers };
