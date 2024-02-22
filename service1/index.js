const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./utils/database");

const bodyParser = require("body-parser");
const router = require("./routes/users");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/service1", router);

async function connectToDatabaseWithRetry(
  retryCount = 10,
  delay = 5000,
  backoff = 2
) {
  console.log(
    `Attempting to connect to the database (retry count: ${retryCount})`
  );
  try {
    // Attempt to authenticate with the database
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.error(error.message);
    if (retryCount > 0) {
      const nextDelay = delay * backoff;
      console.log(`Retrying in ${nextDelay / 1000} seconds...`);
      setTimeout(() => {
        connectToDatabaseWithRetry(retryCount - 1, nextDelay, backoff);
      }, nextDelay);
    } else {
      console.error("Max retries exceeded. Failed to connect to the database");
      // Handle error or exit application if necessary
    }
  }
}
connectToDatabaseWithRetry();

app.listen(3001, () => {
  console.log(`Server is on Port 3001`);
});
