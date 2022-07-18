const app = require('./app');
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");

// Handling Uncaugth Exception 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaugth Exception ");
    server.close(() => {
        process.exit(1);
    });
});

dotenv.config({
    path: "backend/config/config.env"
});

connectDataBase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    })
})