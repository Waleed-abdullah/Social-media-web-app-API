import {} from 'dotenv/config';
import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
import handleSignIn from './controllers/handleSignIn.js';
import handleSaveProfile from './controllers/handleSaveProfile.js';

const app = express();
app.use(json());
app.use(cors());

const connection = createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: process.env.SQL_PORT,
});

app.post('/saveProfile', (req, res) => {
  handleSaveProfile(req, res, connection);
});

app.post('/signin', (req, res) => {
  handleSignIn(req, res, connection);
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to localhost:${port}`));
