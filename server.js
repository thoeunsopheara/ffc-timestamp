
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

function logger(req, res, next){
  console.log(`${req.method}: ${req.path}`);
  next();
}
app.use(logger);

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:time?', (req, res) => {
  const timestamp = req.params.time;
  if(timestamp == undefined){
    const date = new Date();
    res.send({
      unix: date.getTime(), 
      utc: date.toUTCString()
    });
    return;
  }

  const time = Number(timestamp);
  let date;
  if(isNaN(time)){
    date = new Date(timestamp);
    if(date == "Invalid Date"){
      res.send({error: "Invalid Date"});
      return;
    }
  }
  if(!isNaN(time)){
    date = new Date(time);
  }
  res.send({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const PORT = process.env.PORT || 5000;

var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
