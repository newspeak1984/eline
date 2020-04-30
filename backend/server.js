const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const socket = require('socket.io');

require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin:['http://localhost:5000', 'http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
// add try catch? also should whitelist more IP addresses when this goes to prod
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
        // change this later when we deploy
        //secure: true, 
        maxAge: 60*60*1000
    }
  }));

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

var server = app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

//Setup Websockets
const io = socket(server);
io.on('connection', (socket) =>{
    console.log('Successful socket connection', socket.id);

    socket.on('enter', (data) => {
        //user presses button to get inline
        //make changes to add to circular buffer with data (should contain userID)
    });

    socket.on('getNext', (data) => {
        //admin presses get next button
        io.sockets.emit('getNext', newData /*return whos next inline and store id*/);
        //set up getNext listeners on admin(display who is next) AND users(reduce their position in line by 1)
    })
});