const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const router = require('./Routes/routes.js');
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors());
app.use(multer().any());

mongoose.connect(process.env.MongoDBURL)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log(err); })

app.use('/', router)

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
