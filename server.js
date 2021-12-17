const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const fileupload = require("express-fileupload");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const colors = require("colors");

//bring in the router files
const doctor = require("./routes/doctor");
const patient = require("./routes/patient");
const encounter = require("./routes/encounter");
const conversation = require("./routes/conversations");
const message = require("./routes/messages");


const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

const app = express();

//body parser
app.use(express.json());
app.use(fileupload());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());
const limit = rateLimit({
  windowMs: 10 * 60 * 1000, //10mins
  max: 100
});
app.use(limit);


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//connect to db
const db = require("./config/keys/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(connections => {
    console.log(`mongodb connected `.cyan.underline.bold);
  })
  .catch(err => console.log(`${err.message}`.red.bold));

//mount the routers
app.use("/api/v1/doctor", doctor);
app.use("/api/v1/patient", patient);
app.use("/api/v1/encounter", encounter);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //set static folder
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;


const server = app.listen(
  PORT,
  console.log(
    `App listening on PORT: ${PORT}! and on mode : ${process.env.NODE_ENV}`
      .yellow.bold
  )
);
process.on("unhandledRejection" || "uncaughtException", (err, promise) => {
  console.log(`error : ${err.message}`);
  server.close(() => process.exit(1));
});
