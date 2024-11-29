const cors = require("cors");
const express  = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = 8080;
const DB_URI = "mongodb://127.0.0.1:27017/xexit";

mongoose.connect(DB_URI)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("Error in connecting DB", error));

app.use(cors());


app.use(express.json());


app.listen(PORT, ()=>{
    console.log(`Backend is listening on PORT ${PORT}`);
});