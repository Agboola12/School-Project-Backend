const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
const  mongoose  = require('mongoose');
const PORT = process.env.PORT || 5004;
const bodyParser = require('body-parser');

const { rout } = require("./Router");
const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();

mongoose.set('strictQuery', true)

mongoose.connect(process.env.URI).then(res =>{
   console.log("database is connected");
}).catch(err =>{
   console.log( err.message );
})




app.get('/',(req, res)=>{
   res.send("hello world")
})

app.use("/",rout )

app.listen(PORT, ()=>{
    console.log("My server is running on port "+ PORT)
})