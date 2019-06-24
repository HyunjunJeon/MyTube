import dotenv from 'dotenv';
import './db';
import app from './app';

dotenv.config();

import {
  User,
  Video,
  Comment
} from "./models";

{
  User,
  Video,
  Comment
} // Authenticate 활성화 되게끔 

const PORT = process.env.SERVER_PORT || 3000;

const handleListen = (req, res) => {
  console.log(`✅  Listening on: http://localhost:${PORT}`);
};

app.listen(4000, handleListen);