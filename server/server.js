const http = require('http'); // Import Node.js core module
const app = require('./app'); // Import app.js
const mongoose = require('mongoose');

const port = process.env.PORT || 3005; // Set port
const server = http.createServer(app); // create web server
const dbURI = 'mongodb+srv://georgiana:Calshedow2003@backenddb.hzt3td6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB';


mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        }); // listen for incoming requests
    })
    .catch((error) => { 
        console.log('Connection to MongoDB failed');
        console.log(error);
    }); // Connect to MongoDB