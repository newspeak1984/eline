const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//use sessions for tracking logins
app.set('trust proxy', 1);
var MemoryStore =session.MemoryStore;
app.use(session({
    name : 'backend.sid',
    secret: 'yah yeet',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {
        //secure: true, 
        maxAge: 60*60*1000
    }
  }));

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const createAccountRouter = require('./routes/createAccount');
const adminRouter = require('./routes/admin');

app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/createAccount', createAccountRouter);
app.use('/admin', adminRouter);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});