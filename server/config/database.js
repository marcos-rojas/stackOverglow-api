const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/stack-ov2';

exports.connect = () => {
    // Connecting to the database
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection open');
    })
    .catch(err => {
        console.log('Oh no mongoDB error');
        process.exit(1);
    })
};
