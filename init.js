import './db';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import "./models/Video";

const PORT = process.env.SERVER_PORT || 3000;

const handleListen = (req,res)=>{
  console.log(`✅  Listening on: http://localhost:${PORT}`);
};

app.listen(4000, handleListen);