require('dotenv').config();
require("./config/database").connect();

const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const ExpressError = require('./utilities/ExpressError');

const questionRouter = require('./routes/questions')
const answerRouter = require('./routes/answers')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')

const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Static files
app.use(express.static(path.join(__dirname,'public')));

// Routes
app.use('/api/questions', questionRouter);
app.use('/api/questions/:id', answerRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(notFound);

// Middleware for errors
// app.use((err, req, res, next) =>{
//     const {statusCode = 500} = err;
//     if(!err.message){
//         err.message = 'Something went really wrong'
//     }
//     if(!(err instanceof ExpressError)){
//         console.log(err)
//         err.message = "Send me a message if you find this"
//     }
// })


app.use(handleErrors);
// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
});


