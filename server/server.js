import express from "express"
import dotenv from "dotenv";
import './dbConnector.js'
import taskRouter from "./routes/Tasks.routes.js";

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.get('/',(req, res) => {
    res.send({
        status : true,
        message : 'Server is running'
    })
})

app.use('/api/tasks/', taskRouter)

app.use((req, res) => {
    res.status(400).send({
        status : false,
        message : 'Route not found'
    })
})

app.listen(PORT, () => {
    console.log('Server running at '+PORT);
    
})