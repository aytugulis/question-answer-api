const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const routers = require('./routers/index');
const path = require('path');

const app = express();

// Enviroment Variables
dotenv.config({
    path : "./config/env/config.env"
});

//MongoDb Connection
connectDatabase();

// Express - Body Middleware

app.use(express.json());


const PORT = process.env.PORT;

// Routers Middleware

app.use('/api', routers);

// Error Handling

app.use(customErrorHandler);

// Static File

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send('Hello question answer api!');
})

app.listen(PORT, () => {
    console.log(`Application started on ${PORT} : ${process.env.NODE_ENV}`);
})
