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
  // const host = process.env.DOCKER_HOST; //|| process.env.DB_HOST;
  // const port = process.env.DOCKER_PORT; //|| process.env.DB_PORT;
  await mongoose.connect(
    `mongodb://mongo_connection:27017/t_connection`,
    // `${process.env.DB_PROTOCOL}${host}:${port}/${process.env.DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

module.exports = { run };
