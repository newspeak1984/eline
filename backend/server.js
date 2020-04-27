const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// add try catch? also should whitelist more IP addresses when this goes to prod
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const createAccountRouter = require('./routes/createAccount');
const createStoreRouter = require('./routes/createStore');
const adminRouter = require('./routes/admin');

app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/createAccount', createAccountRouter);
app.use('/createStore', createStoreRouter);
app.use('/admin', adminRouter);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});