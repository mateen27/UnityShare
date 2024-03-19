const  express = require('express');
const connectDatabase = require('./config/database');
const app = express();
require('dotenv').config();

// connect to database
connectDatabase();

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
} )