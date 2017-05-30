const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const solve = require('./routes/solve');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const PORT = 9090;


app.use('/sudoku',solve);

app.listen(PORT,()=>{
  console.log('Ninja is ready to solve! (on port',PORT,')');
});
