const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect('mongodb+srv://OmarMokhtar:UYDr6mVgrNgF0zqR@cluster0.3uauouu.mongodb.net/Falcon')
        .then((conn) => {
            console.log(`DB is Connection ${conn.connection.host}`);
        })
}

module.exports = dbConnection