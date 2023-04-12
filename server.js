const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");

let corsOptions = { origin: "http/localhost/8081" };

(async () => {
  await db.sequelize.sync();
  console.log("Connected to MySQL");
})();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/index"));

const Port = process.env.PORT || 8000;
app.listen(Port, () => console.log(`the port is running on port ${Port}`));
