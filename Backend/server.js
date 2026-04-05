const app = require("./src/app")
const dotenv = require("dotenv")
const dataRoute = require('./src/routes/data.route')
dotenv.config()
const PORT = process.env.PORT || 6000
app.use('/api/data', dataRoute);
app.listen(PORT, () => {
    console.log("Server is running at PORT-", PORT)
})