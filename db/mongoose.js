const mongoose = require("mongoose");

const DatabaseURL = "mongodb://127.0.0.1:27017/"
const DatabaseName = "playlist-manager"

mongoose.connect(DatabaseURL + DatabaseName, { useNewUrlParser: true, useCreateIndex: true })
