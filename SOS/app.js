const express = require('express')
const accountSid = 'ACd9c91d0369e0d47ec1367e038dc85c2d';
const authToken = 'eb595969c20290a65a33e9f3b688d4ac';
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const { Long } = require('mongodb');
const client = require('twilio')(accountSid, authToken);
const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(8085, ()=> console.log('port 8085'))

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.post('/message', (req,res) => {
    
    var loc = `${req.body.lon} `+ " "+ `${req.body.lat}`;
    console.log(loc);

client.messages
.create({
    body: loc + 'SOS message please send help',
    from: '+14154831489',
    to: '+919721473651'
})
.then((res) => console.log('message sent', res))
.catch((err) => {console.log(err)})
});