const express = require('express'); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const app = express(); 
const playlistLibrary = require('./routes/playlistLibrary');
const songList = require('./routes/songList');
const userList = require('./routes/userList');
const refreshToken = require('./routes/refresh');
const logout = require('./routes/logout');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs'); // Set view engine to EJS
app.use(morgan('dev')); // Logger Middleware
app.use(bodyParser.urlencoded({extended: false})); // Parse URL-encoded simple bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS - Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Headers allowed
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // Methods allowed
        return res.status(200).json({});
    }
    next();
});

// middleware to parse cookies
app.use(cookieParser()); 
// Routes - work like a waterfall
app.use('/users', userList);
app.use('/refresh', refreshToken);
app.use('/logout', logout);

//app.use(verifyJWT); // Verify JWT
app.use('/playlistLibrary', playlistLibrary);
app.use('/songList', songList);  

// Error handling - All requests that reach this line have not been handled by the above routes
app.use((req, res, next) => {
    const error = new Error('Not found'); // Error message
    error.status = 404; // Error status
    next(error); // Next
});

// this hendels all kinds of errors that are thrown in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500); // Error status
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app; // Export app