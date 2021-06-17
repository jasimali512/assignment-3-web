const express = require("express");
const app = express();
app.use(express.json());
var faculty = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var cors=require('cors');

app.use(cors({origin:true,credentials: true}));
//first parameter is url
//second is a function with two inputs one is request and one is response
app.use(express.static("public"));
app.get("/api/faculty", function (req, res) {
  res.json(faculty);
});
//get one resource
app.get("/api/faculty/:index", function (req, res) {
  if (!faculty[req.params.index])
    return res.status(400).send("Product not found");
  res.send(faculty[req.params.index]);
});
//update one resource with id e.g. index
app.put("/api/faculty/:index", function (req, res) {
  //   console.log(req.body);
  faculty[req.params.index].name = req.body.name;
  res.send(faculty[req.params.index]);
});
//delete one resource
app.delete("/api/faculty/:index", function (req, res) {
  faculty.splice(req.params.index, 1);
  res.send(faculty);
});
//create one resource
app.post("/api/faculty", function (req, res) {
  // console.log(req.body)
  faculty.push(req.body);
  console.log(faculty);
  res.send(faculty);
});

app.listen(process.env.PORT || 3000);
