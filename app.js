const express = require('express');
const path = require('path');
const bodyParser =require('body-parser');
const cors = require ('cors');
const http = require('http');
const passport = require('passport');
const mongoose =require ('mongoose');
const dbConfig = require('./config/database')
 const bookRouter = require('./routes/bookRouter');
const index = require('./routes/index');
const user = require('./routes/user');
const profile  =require('./routes/profileRouter');
const bookissue = require('./routes/bookissuedroute');
// define our app using express
const app=express();

// const multer = require('multer')
// const path = require('path')
// const UPLOAD_PATH = path.resolve(__dirname, '../uploads')
// const upload = multer({
//   dest: UPLOAD_PATH,
//   limits: {fileSize: 1000000, files: 5}
// })

app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// allow-cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  
// import routes
// app.use('/',index);
app.use('/', express.static(path.join(__dirname, 'dist/index.html')));
app.use('/books', bookRouter);
app.use('/user', user);
app.use('/profile',profile);
app.use('/bookissue',bookissue);
const hostname = 'localhost';
// set the port
const port = 3000;
// connect to database
const url = 'mongodb://localhost:27017/librarymanagement';
const connect = mongoose.connect(dbConfig.database);
console.log('in app.js')
console.log(url)

connect.then((db) => {
    console.log("Connected correctly to server" + db);
}, (err) => { console.log(err); });





  var server = http.createServer(app);
// start the server


server.listen(port,hostname,()=>{
    console.log("server started");
})
// app.listen(port,()=>{
//     console.log('server started on port :${port}');
// });

// upload image
// app.post('/api/image', upload.single('image'), (req, res, next) => {
//     const images = req.files.map((file) => {
//       return {
//         filename: file.filename,
//         originalname: file.originalname
//       }
//     })
//     // Image.insertMany(images, (err, result) => {
//     //   if (err) return res.sendStatus(404)
//     //   res.json(result)
//     // })
//   })
  
//   // get image with id
//   app.get('/:id', (req, res, next) => {
//     Image.findOne({_id: req.params.id}, (err, image) => {
//       if (err) return res.sendStatus(404)
//       fs.createReadStream(path.resolve(UPLOAD_PATH, image.filename)).pipe(res)
//     })
//   })