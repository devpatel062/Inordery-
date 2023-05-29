const express = require("express")
const cors = require("cors")
require("./src/db/mongoose")

const app = express()
const port = process.env.port || 3001

const menu = require("./src/modules/menu")
const order = require("./src/modules/order")

const menuRouter = require("./src/routers/menu")
const orderRouter = require("./src/routers/order")

app.use(cors())
app.use(express.json())
app.use('/mysite/menu' ,menuRouter)
app.use('/mysite/orders',orderRouter)


app.listen(port,()=>{
    console.log("Server Started on Port "+port)
})
