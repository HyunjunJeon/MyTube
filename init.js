import dotenv from 'dotenv';
import './db';
import app from './app';

dotenv.config();

import { user, video, comment } from "./models";

const PORT = process.env.SERVER_PORT || 3000;

const handleListen = (req,res)=>{
  console.log(`✅  Listening on: http://localhost:${PORT}`);
};

app.listen(4000, handleListen);