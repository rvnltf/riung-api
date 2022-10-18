import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mysql from "mysql2/promise";
import fs from "fs";
import bcrypt from "bcryptjs";

import db from "./config/riungDb.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import admin from "./routes/admin.js";
import content from "./routes/content/content.js";
import comment from "./routes/content/comment.js";
import handleErrors from "./middleware/handleErrors.js";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { HOST, PORT_DB, USER, PASSWORD, DATABASE } = process.env;
  const connection = await mysql.createConnection({
    host: HOST,
    port: PORT_DB,
    user: USER,
    password: PASSWORD,
  });
  const database = await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`
  );

  const Role = await db.role;
  // const User = await db.user;
  if (database) {
    await db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and Resync Db");

      Role.create({ id: 1, name: "admin" });
      Role.create({ id: 2, name: "user" });

      // const salt = bcrypt.genSaltSync(10);
      // const password = bcrypt.hashSync("12345678", salt);
      // User.create({
      //   id: 7,
      //   email: "michael.lawson@reqres.in",
      //   username: "michael.lawson",
      //   fullname: "MichaelLawson",
      //   password,
      //   active: 1,
      // });
      // User.create({
      //   id: 8,
      //   email: "lindsay.ferguson@reqres.in",
      //   username: "lindsay.ferguson",
      //   fullname: "Lindsay Ferguson",
      //   password,
      //   active: 1,
      // });
      // User.create({
      //   id: 9,
      //   email: "tobias.funke@reqres.in",
      //   fullname: "Tobias Funke",
      //   username: "tobias.funke",
      //   password,
      //   active: 1,
      // });
    });
  }
}

// let accessLogStream = fs.createWriteStream("./log/access.log", { flags: "a" });

let corsOption = {
  origin: "http://localhost:8081",
};

app.use(morgan("dev"));

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Tetha Apps.",
  });
});

app.use("/api/v1/auth", auth);
// app.use("/api/v1/guest", guest);
app.use("/api/v1/user", user);
app.use("/api/v1/admin", admin);

app.use("/api/v1/content", content);
app.use("/api/v1/comment", comment);
app.use("/api/v1/user", user);

app.use(handleErrors);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
