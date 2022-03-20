require("dotenv").config();
const express = require("express")
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('uploads'));
app.use((req,res,next)=>{
    routes(app);
    next();
});

app.listen( port, ()=>{
    console.log(`Server is listening to port ${port}`);
});