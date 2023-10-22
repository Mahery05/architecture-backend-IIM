// init server express
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 3000;
const PkmRouter = require('./router/PkmRouter');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://maheryrazakandraina:arch912neat125@cluster0.fakoiwe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
    

// add router
app.use('/pkm', PkmRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
  });


app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
  });

app.listen(port,() =>{
    console.log(`Example app listening at http://localhost:${port}`)
});
