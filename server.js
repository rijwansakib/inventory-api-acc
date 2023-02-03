const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
//const DBConnect = require("./utils/dbConnect");

const app = require("./app");



// database connection
mongoose.connect(process.env.DATABASE_LOCAL,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true, //make this true
  autoIndex: true, //make this also true
}).then(()=>{
  console.log(`DataBase connect successfully`.red.bold);
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

