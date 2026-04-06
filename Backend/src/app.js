const express = require("express")
const app = express()
const cors = require("cors")


app.use(express.json());
app.use(cors({
  origin: 'https://flow-finance-gules.vercel.app',
  credentials: true
}));

module.exports = app