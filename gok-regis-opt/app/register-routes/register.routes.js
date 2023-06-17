module.exports = app => {

  const registers = require("../register-controllers/register.controller.js");

  var router = require("express").Router();

  var authen = require("express").Router();

  var userinfo = require("express").Router();

  var chat = require("express").Router();

  // Create a new Tutorial
  router.post("/", registers.create);

  // Create a new Tutorial
  router.post("/update/:authenID", registers.postUpdate);

  // Retrieve all registers
  router.get("/", registers.findAll);

  // Retrieve all published registers
  router.get("/published", registers.findAllPublished);

  // Retrieve a single Tutorial with Authen
  // router.get("/authenID/:authenID", registers.findAuthenID);

  // Retrieve a single Tutorial with id
  router.get("/:id", registers.findOne);

  // Update a Tutorial with id
  router.put("/:id", registers.update);

  // Delete a Tutorial with id
  router.delete("/:id", registers.delete);

  // Create a new Tutorial
  router.delete("/", registers.deleteAll);

  app.use("/api/registers", router);


  //------------------ Authen ----------------------//

  app.use("/api/authens", authen);

  // Find user by authenID when login
  authen.get("/", registers.findAllAuthen);


  //----------------- User Information -----------------------//

  app.use("/api/userinfos", userinfo);

  // Find user by id
  userinfo.get("/", registers.findUserInfo);

  // Update user info by id
  userinfo.patch("/:id", registers.patchUserProfile);


  //------------------ chat section ----------------------//

  app.use("/api/chats", chat);

  // Update user info by id
  chat.get("/", registers.chatfindOne);

  // Create a new Tutorial
  chat.post("/", registers.chatcreate);


};
