const mysql = require("mysql");
const express = require("express");
const { parse } = require("path");
const cardData = require("./Data/cardData.json");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "Hospital",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  } else {
    console.log("Connected to the MySQL server.");
  }
});

//route for index page
app.get("/", function (req, res) {
  res.render("index", { cardData: cardData });
});
app.get("/Doctors", function (req, res) {
  connection.query("SELECT * FROM Doctors", (err, result, fields) => {
    if (err) {
      res.send("some error accured");
      console.log(err);
    } else {
      res.render("doctors", { result: result });
    }
  });
});
app.get("/Doctors/add", function (req, res) {
  res.render("create", { add: "Doctor" });
});
app.post("/Doctors/add", function (req, res) {
  console.log(req.body);
  connection.query(
    `insert into Doctors (Name, SSN, Address) values('${req.body.Name}','${req.body.SSN}','${req.body.Address}')`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("some error accured");
      } else {
        res.send("send");
      }
    }
  );
});
app.get("/Doctors/:id", function (req, res) {
  connection.query(
    `SELECT * FROM Doctors WHERE D_ID = ${req.params.id}; SELECT * FROM Treat WHERE D_ID = ${req.params.id};SELECT * FROM Patients`,
    (err, result, fields) => {
      if (err) {
        res.send("some error accured");
        console.log(err);
      } else {
        console.log(result);
        res.render("doctor", { result: result });
      }
    }
  );
});
app.delete("/Doctors/:id", function (req, res) {
  console.log(req.params.id);
  connection.query(
    `Delete FROM Doctors WHERE D_ID = '${req.params.id}';`,
    (err, result, fields) => {
      if (err) {
        res.send("some error accured");
        console.log(err);
      } else {
        console.log("deleted");
        res.send("deleted");
      }
    }
  );
});
app.get("/Nurses", function (req, res) {
  connection.query("SELECT * FROM Nurses", (err, result, fields) => {
    if (err) {
      res.send("some error accured");
      console.log(err);
    } else {
      res.render("nurses", { result: result });
    }
  });
});
app.get("/Nurses/add", function (req, res) {
  res.render("create", { add: "Nurse" });
});
app.post("/Nurses/add", function (req, res) {
  console.log(req.body);
  connection.query(
    `insert into Doctors (Name, SSN, Address) values('${req.body.Name}','${req.body.SSN}','${req.body.Address}')`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("some error accured");
      } else {
        res.send("send");
      }
    }
  );
});
app.get("/Nurses/:id", function (req, res) {
  console.log(req.params.id);
  connection.query(
    `SELECT * FROM Nurses WHERE SSN = '${req.params.id}'; SELECT * FROM Take_Care WHERE SSN = '${req.params.id}';SELECT * FROM Patients`,
    (err, result, fields) => {
      if (err) {
        res.send("some error accured");
        console.log(err);
      } else {
        console.log(result);
        res.render("nurse", { result: result });
      }
    }
  );
});
app.delete("/Nurses/:id", function (req, res) {
  console.log(req.params.id);
  connection.query(
    `Delete FROM Nurses WHERE SSN = '${req.params.id}';`,
    (err, result, fields) => {
      if (err) {
        res.send("some error accured");
        console.log(err);
      } else {
        console.log("deleted");
        res.send("deleted");
      }
    }
  );
});
app.get("/Patients/add", function (req, res) {
  res.render("create", { add: "Patient" });
});
app.post("/Patients/add", function (req, res) {
  console.log(req.body);
  connection.query(
    `insert into Patients (Name, SSN, Phone_Num, Diseas, Address, Treatment) values('${req.body.Name}','${req.body.SSN}','${req.body.phone}','${req.body.Diseas}','${req.body.Address}','${req.body.message}')`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.send("some error accured");
      } else {
        res.send("send");
      }
    }
  );
});
app.get("/Patients", function (req, res) {
  connection.query("SELECT * FROM Patients", (err, result, fields) => {
    if (err) {
      res.send("some error accured");
      console.log(err);
    } else {
      res.render("patients", { result: result });
    }
  });
});
app.get("/Patients/:id", function (req, res) {
  console.log(req.params.id);
  connection.query(
    `SELECT * FROM Patients WHERE P_ID = '${req.params.id}'; SELECT * FROM Treat WHERE P_ID = '${req.params.id}';SELECT * FROM Doctors`,
    (err, result, fields) => {
      if (err) {
        res.send("some error accured");
        console.log(err);
      } else {
        console.log(result);
        res.render("patient", { result: result });
      }
    }
  );
});
app.delete("/Patients/:id", function (req, res) {
  console.log(req.params.id);
  connection.query(
    `Delete FROM Patients WHERE P_ID = '${req.params.id}';`,
    (err, result, fields) => {
      if (err) {
        res.send("some error accured");
        console.log(err);
      } else {
        console.log("deleted");
        res.send("deleted");
      }
    }
  );
});
let PORT = 3002;
app.listen(PORT, () => {
  console.log("app is listening in port ", PORT);
});
