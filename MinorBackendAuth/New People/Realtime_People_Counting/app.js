const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const nodeCmd = require('node-cmd');
const app = express();
app.use(express.static("public"));



// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/submit', (req, res) => {
  const station = req.body.location;
  const video = req.body.video;

 nodeCmd.run(`python main.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel --input videos/${video} --place ${station}.csv`, (err, data, stderr) => console.log(data));
 
});


app.get('/', (req, res) => {
    res.render("admin");
  });

//   app.get('/webcam', (req, res) => {
//     res.render("counter");
// nodeCmd.run("python main.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel", (err, data, stderr) => console.log(data));
//   });

//   app.get('/upload', (req, res) => {
//     res.render("counter");
// nodeCmd.run("python main.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel --input videos/ex2.mp4 ", (err, data, stderr) => console.log(data));
//   });

  

  const port = 8082;
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });