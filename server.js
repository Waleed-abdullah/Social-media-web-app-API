import {} from 'dotenv/config';
import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
import handleSignIn from './controllers/handleSignIn.js';
import handleSaveProfile from './controllers/handleSaveProfile.js';
import handleSavePost from './controllers/handleSavePost.js';
import handleGetPosts from './controllers/handleGetPosts.js';
import handleGetComments from './controllers/handleGetComments.js';
import handleGetUsers from './controllers/handleGetUsers.js';
import handleGetInterests from './controllers/handleGetInterests.js';
import handleSetLike from './controllers/handleSetLike.js';
import handleGetLike from './controllers/handleGetLike.js';
import handleSendRequest from './controllers/handleSendRequest.js';
import handleGetRequested from './controllers/handleGetRequested.js';
import multer from 'multer';
import path from 'path';
import handleSaveComments from './controllers/handleSaveComments.js';
import handleDeleteLike from './controllers/handleDeleteLike.js';
import handleDeleteRequest from './controllers/handleDeleteRequest.js';
import handleGetFriends from './controllers/handleGetFriends.js';
import handleGetNotifRequests from './controllers/handleGetNotifRequests.js';

const __dirname = path.resolve();
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

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

app.get('/', (req, res) => res.status(200).send('Hello World'));

app.post('/saveProfile', async (req, res) => {
  handleSaveProfile(req, res, connection);
});

app.post('/upload/post', async (req, res) => {
  handleSavePost(req, res, connection);
});

app.get('/notif/requests', async (req, res) => {
  handleGetNotifRequests(req, res, connection);
});

app.post('/signin', async (req, res) => {
  handleSignIn(req, res, connection);
});

app.get('/get/post/:id', async (req, res) => {
  handleGetPosts(req, res, connection);
});

app.get('/friends', async (req, res) => {
  handleGetFriends(req, res, connection);
});

app.get('/get/comment/:id', async (req, res) => {
  handleGetComments(req, res, connection);
});

app.post('/upload/comment', async (req, res) => {
  handleSaveComments(req, res, connection);
});

app.get('/get/users/:search', async (req, res) => {
  handleGetUsers(req, res, connection);
});

app.get('/get/interests/:id', async (req, res) => {
  handleGetInterests(req, res, connection);
});

app.post('/set/like', async (req, res) => {
  handleSetLike(req, res, connection);
});

app.delete('/delete/like', async (req, res) => {
  handleDeleteLike(req, res, connection);
});

app.get('/get/like', async (req, res) => {
  handleGetLike(req, res, connection);
});

app.post('/send/request', async (req, res) => {
  handleSendRequest(req, res, connection);
});

app.get('/get/requested', async (req, res) => {
  handleGetRequested(req, res, connection);
});

app.delete('/delete/request', async (req, res) => {
  handleDeleteRequest(req, res, connection);
});

app.use('/retrieve', express.static(path.join(__dirname, '/public/images')));

let storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './public/images/'); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

app.post('/upload/postImage', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('No file upload');
  } else {
    console.log(req.file.filename);
    res.status(201).send(req.file.filename);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to localhost:${port}`));

/*
let insertData = 'INSERT INTO `post` (postImage) VALUES(?)'
      connection.query(insertData, [imgsrc], (err, result) => {
          if (err) {throw err}
          console.log("file uploaded")
          res.status(201).send(req.file.filename)
      })
*/

/*
app.get("/retrieve", (req, res) => {
  const id = 1;
  const sqlQ = "SELECT postImage FROM post WHERE postID = 6"

  connection.query(sqlQ, [id], (err, result) => {
    if (err){
      console.log(err)
      res.send({
        msg: err
      })
    }

    if (result){
      console.log(result[0].postImage)
      res.send({
        image: result[0].postImage
      })
    }
  })
})
*/
