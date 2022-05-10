import expree from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();


import userRouter from './route/user.js';


const app = expree();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;


app.use(morgan("dev"));
app.use(expree.json({limit: "30mb", extended: true}));
app.use(expree.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);

app.get("/", (req,res)=>{
    res.send("Hello World!!!!")
})

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on("connected", (err, res) => {
    console.log("mongoose is connected")
    app.listen(PORT,()=>{
        console.log(`Server ruuning on port ${PORT}`);
    })
  })
