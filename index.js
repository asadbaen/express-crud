const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connection mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "todo",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  res.send("OK");
});
// get data
app.get("/api/todo", (req, res) => {
  const querySql = "SELECT * FROM profile";
  db.query(querySql, (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ status: true, data: result, message: "data ditemukan !" });
  });
});
// get byId
app.get("/api/todo/(:id)", (req, res) => {
  const id = req.params.id;
  const querySql = `SELECT * FROM profile WHERE id =${id}`;

  db.query(querySql, [id], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ status: true, data: result, message: "data ditemukan !" });
  });
});

// create data
app.post("/api/createtodo", (req, res) => {
  const name = req.body.name;
  const des = req.body.des;
  const querySql = `INSERT INTO profile (name, des) VALUES(?, ?)`;

  db.query(querySql, [name, des], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ status: true, data: result, message: "berhasil di tambahkan !" });
  });
});

// update
app.put("/api/edittodo/(:id)", (req, res) => {
  const id = req.params.id;
  const data = { ...req.body };

  const querySql = `UPDATE profile SET ? WHERE id= ${id}`;
  db.query(querySql, [data, id], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ status: true, data: result, message: "berhasil Di Edit!" });
  });
});

// delete
app.delete("/api/deletetodo/:id", (req, res) => {
  const id = req.params.id;
  const querySql = `DELETE FROM profile WHERE id = ${id}`;

  db.query(querySql, [id], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ status: true, data: result, message: "berhasil dihapus !!" });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
