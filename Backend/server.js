const express = require('express')
const app = express();
require("dotenv").config();
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter =  require('./Routes/authRouter')



require('./models/db')

const PORT= process.env.PORT ||8080;




app.use(bodyParser.json())


app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use(express.static('public'));
// // app.use(express.static('public'));



app.use('/',authRouter)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})