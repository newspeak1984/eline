const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const socket = require('socket.io');
let Store = require('./models/store_model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true // enable set cookie
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
// add try catch? also should whitelist more IP addresses when this goes to prod
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//use sessions for tracking logins
app.set('trust proxy', 1);
var MemoryStore = session.MemoryStore;
app.use(session({
    name: 'backend.sid',
    secret: 'yah yeet',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {
        // change this later when we deploy
        //secure: true, 
        maxAge: 60 * 60 * 1000 * 2
    }
}));

//Storage for queues
let stores = [];

//Load stores from db into local storage
Store.find()
    .then((dbStores) => {
        dbStores.map((store) => {
            addNewStore(store.name, store._id);
        });
    })
    .catch((err) => console.log(err));

//Functions for data storage
function addNewStore(storeName, storeId) {
    let newStore = {
        "name": storeName,
        "storeId": storeId,
        "queue": []
    }
    stores.push(newStore);
}

function getStoreLineSize(storeId) {
    for (i = 0; i < stores.length; i++) {
        if (stores[i].storeId == storeId) {
            return stores[i].queue.length;
        }
    }
}

function addUserToLine(customerId, storeId) {
    stores.map((store) => {
        if (store.storeId == storeId) {
            if (store.queue.indexOf(customerId) === -1) {
                store.queue.push(customerId);
            }
            // check to see if its at max cap
        }
    })
}

function getIndexofUser(customerId, storeId) {
    for (i = 0; i < stores.length; i++) {
        if (stores[i].storeId == storeId) {
            for (j = 0; j < stores[i].queue.length; j++) {
                if (stores[i].queue[j] == customerId) {
                    return j;
                }
            }
        }
    }
}

function getNext(storeId) {
    for (i=0; i<stores.length; i++) {
        if (stores[i].storeId == storeId) {
            if (stores[i].queue.length > 0) {
                let first = stores[i].queue[0];
                stores[i].queue.splice(0, 1);
                return first;
            }
            else {
                console.log('No Customers in Line');
                return null;
            }
        }
    }
}

function removeCustomer(customerId, storeId) {
    stores.map((store) => {
        if (store.storeId == storeId) {
            let index = store.queue.indexOf(customerId);
            if (index > -1) {
                store.queue.splice(index, 1);
                console.log('CUSTOMER REMOVED')
            }
            else {
                console.log('Customer not found in line');
            }
        }
    })
}

//Routers
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const createAccountRouter = require('./routes/createAccount');
const storeRouter = require('./routes/store');
const adminRouter = require('./routes/admin');
const profileRouter = require('./routes/profile');

app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/createAccount', createAccountRouter);
app.use('/store', storeRouter);
app.use('/admin', adminRouter);
app.use('/profile', profileRouter);

let server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//Setup Websockets
const io = socket(server);
io.on('connection', (socket) => {
    console.log('Successful socket connection', socket.id);

    socket.on('enter', (data) => {
        //user presses button to get inline
        //make changes to add to circular buffer with data (should contain customerId)
        //emit line size at time of entry to specific user so
        console.log("enter: " + JSON.stringify(data));
        // FIXME: event received twice??? first with store and customer, then right after with just store????
        addUserToLine(data.customerId, data.storeId);
        index = getIndexofUser(data.customerId, data.storeId)
        customer = (data.customerId) ? data.customerId : customer
        io.sockets.emit('initialPosition', {
            index: index,
            customerId: data.customerId,
            storeId: data.storeId
        });
    });

    socket.on('getNext', (data) => {
        //admin presses get next button
        // data is the storeId
        console.log("getNext", data);
        nextCustomer = {
            customerId: getNext(data),
            storeId: data
        }
        io.sockets.emit('getNext', nextCustomer);
        //set up getNext listeners on admin(display who is next) AND users(reduce their position in line by 1)
    })

    socket.on('leaveLine', (data) => {
        console.log('leaveLine', data.storeId, data.customerId, data.index, data.isAllowedIn);
        removeCustomer(data.customerId, data.storeId);
        io.sockets.emit('leaveLine', {storeId: data.storeId, index: data.index, isAllowedIn: data.isAllowedIn})
    })

    socket.on('customerArrived', (data) => {
        console.log('customerArrived', data)
        io.sockets.emit('customerArrived', data);
    })
});

module.exports.addStore = addNewStore;
module.exports.print = () => {
    console.log(stores);
}