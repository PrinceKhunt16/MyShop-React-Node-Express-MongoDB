const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose
        .connect(process.env.DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`)
        })
        .catch((error) => console.log(error));
}

module.exports = connectDataBase;