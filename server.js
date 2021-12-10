import {} from 'dotenv/config';
import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';
import handleSignIn from './controllers/handleSignIn.js';
import handleSaveProfile from './controllers/handleSaveProfile.js';
import multer from 'multer'
import path from 'path'

const __dirname = path.resolve()
const app = express();
app.use(json());
app.use(cors());

app.use('/retrieve', express.static(path.join(__dirname, '/public/images')));

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

let storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({
  storage: storage
});

app.post("/upload", upload.single('file'), (req, res) => {
  if (!req.file) {
      console.log("No file upload");
  } else {
      console.log(req.file.filename)
      let imgsrc = req.file.filename
      let userID = "nansjansjansjnd"
      let insertData = 'INSERT INTO `post` (postImage) VALUES(?)'
      connection.query(insertData, [imgsrc, userID], (err, result) => {
          if (err) {throw err}
          console.log("file uploaded")
          res.status(201).send(req.file.filename)
      })
  }
});

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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to localhost:${port}`));
