const app = require("./app");
const dotenv = require("dotenv");

// Config to env file
dotenv.config({ path: "backend/config/config.env" })

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})