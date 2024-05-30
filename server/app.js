const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const playlistLibrary = require("./src/routes/playlistLibrary");
const songList = require("./src/routes/songList");
const userList = require("./src/routes/userList");
const refreshToken = require("./src/routes/refresh");
const logout = require("./src/routes/logout");
const verifyJWT = require("./src/middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const credentials = require("./src/middleware/credentials");

app.set("view engine", "ejs"); // Set view engine to EJS
app.use(morgan("dev")); // Logger Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded simple bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(credentials); // CORS Middleware
app.use(cors(corsOptions)); // CORS Middleware
// CORS - Cross Origin Resource Sharing
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://http://localhost:3005/users/login', 'https://http://localhost:3005/refresh','https://http://localhost:3005/logout', 'https://http://localhost:3005/playlistLibrary/all','https://http://localhost:3005/songList'/*'*');*/ // Allow all origins
/*res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Headers allowed
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // Methods allowed
        return res.status(200).json({});
    }
    next();
});*/

// middleware to parse cookies
app.use(cookieParser());
// Routes - work like a waterfall
app.use("/users", userList);
app.use("/refresh", refreshToken);
app.use("/logout", logout);

//app.use(verifyJWT); // Verify JWT
app.use("/playlistLibrary", playlistLibrary);
app.use("/songList", songList);

// Error handling - All requests that reach this line have not been handled by the above routes
app.use((req, res, next) => {
  const error = new Error("Not found"); // Error message
  error.status = 404; // Error status
  next(error); // Next
});

// this hendels all kinds of errors that are thrown in the application
app.use((error, req, res, next) => {
  res.status(error.status || 500); // Error status
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app; // Export app
