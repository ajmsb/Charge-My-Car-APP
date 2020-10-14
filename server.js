const express = require('express');
const colors = require('colors');
const cors = require("cors");
require("dotenv").config({ path: './config/.env' });



// 🔥 Express setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold));

// 🔥 Mongoose setup
const connectDB = require('./config/db');
connectDB();


// 🔥 Routes Setup
app.use("/users", require("./routes/userRouter"));


//🔥 deployment, serve static assets 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}



