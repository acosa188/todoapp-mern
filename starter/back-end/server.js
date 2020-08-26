const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// models
const todoModel = require('./models/todoModel');

// api
const todoApi = require('./api/todoApi');

const PORT = 4000;
const db = `mongodb+srv://mushydumpling:p@ssw0rd@tododemo.fz1ss.mongodb.net/todosdatabase?retryWrites=true&w=majority`;

// installing middleware
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`);
});

// Connecting to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>{
    console.log('Succesfully connected to the database');
})
.catch(err =>{
    console.log('Error' + err);
});

// Api Middleware
app.use('/todos', todoApi);

