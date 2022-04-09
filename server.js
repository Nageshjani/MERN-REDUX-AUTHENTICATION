const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cookies = require("cookie-parser");
app.use(cookies());
dotenv.config();
var fileupload = require("express-fileupload");

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const cors=require("cors")
app.use(fileupload({
  useTempFiles : true,
}));
const path=require("path")

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,'POST, GET, OPTIONS");
    next();
});  

app.use(cors({

    origin:["https://mern-fully-authentication.herokuapp.com", 'http://localhost:3000'],
    credentials: true,
}))

app.use('/api', require('./routes/upload'))

app.use('/user', require('./routes/userRouter'))







mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}  



app.listen(process.env.PORT || 4955, () => {
  console.log("Backend server is running!",process.env.PORT);
});

