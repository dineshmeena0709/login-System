const express = require('express')
const app = express();
require("dotenv").config();
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter =  require('./Routes/authRouter')

require('./models/db')

const PORT= process.env.PORT ||8080;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',authRouter)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})