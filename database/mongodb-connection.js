const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.set('useFindAndModify', false);

mongoose.connection.on("connected", () => {
  console.log("Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("Connection Closed");
});

mongoose.connection.on("error", error => {
  console.log("ERROR: " + error);
});

const run = async () => {
  await mongoose.connect(
    `${process.env.DB_PROTOCOL}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
    {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    }
  );
};

module.exports = { run };
