const dbConfig = require("../member-config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.members = require("./member.model.js")(mongoose);

module.exports = db;
