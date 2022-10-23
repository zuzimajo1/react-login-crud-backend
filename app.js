require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const AuthRouter = require("./routes/AuthRouter");
const UsersRouter = require("./routes/UserRouter");

mongoose.connect(process.env.MONGODB).then(()=> console.log("Connected")).catch((err)=> console.log(err));

//API Routes
app.use("/auth", AuthRouter);
app.use("/users", UsersRouter);


app.get('/', (req, res)=>{
    res.status(200).send('Server is running');
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))



