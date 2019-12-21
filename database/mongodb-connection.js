const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.set("useFindAndModify", false);

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
    //`mongodb://mongo_connection:27017/t_connection`,
    `${process.env.DB_PROTOCOL}${process.env.MONGO_SERVICE}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

module.exports = { run };
