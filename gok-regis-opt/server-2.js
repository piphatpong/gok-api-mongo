require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();

var uri = 'mongodb+srv://mrphatsorn:Samurai2517@cluster0.tifvjce.mongodb.net/googkikdb?retryWrites=true&w=majority';

//const url = require("./services/configs/gokdb.config");

const { MongoClient } = require("mongodb");

//const uri = url.mongoserver;

app.use(cors());
app.use(express.json());

//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})

const db = require("../register-models/register-model");
const Register = db.registers;

app.get('/users', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const users = await client.db('googkikdb').collection('register-collects').find({}).toArray();
  await client.close();
  res.status(200).send(users);
});


app.post('/users/create', async(req, res) => {
  const user = req.body;
  const register = new Register({
    authenID: req.body.authenID,
    email: req.body.email,
    setpass: req.body.setpass,
    repass: req.body.repass,
    nickname: req.body.nickname,
    gender: req.body.gender,
    birthday: req.body.birthday,
    nationality: req.body.nationality,
    photo: req.body.photo,
    published: req.body.published ? req.body.published : false
  });
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('googkikdb').collection('register-collects').save(register);

  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = "+user.id+" is created",
    "user": user
  });
});


/*--app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});