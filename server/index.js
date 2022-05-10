import expree from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './route/user.js';

const port = 3000;

const app = expree();

app.use(morgan("dev"));
app.use(expree.json({limit: "30mb", extended: true}));
app.use(expree.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);

app.get("/", (req,res)=>{
    res.send("Hello World!!!!")
})

const MONGODB_URL= "mongodb+srv://touropedia:touropdia123@cluster0.6pw8r.mongodb.net/tour_db?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on("connected", (err, res) => {
    console.log("mongoose is connected")
    app.listen(port,()=>{
        console.log(`Server ruuning on port ${port}`);
    })
  })
