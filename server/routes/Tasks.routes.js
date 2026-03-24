import express from "express"
import { createTask, deleteTask, getAllTasks, getTaskByID, updateTask } from "../controllers/task.controller.js"

const taskRouter = express.Router()

taskRouter.get('/', getAllTasks)

taskRouter.get('/:id', getTaskByID)

taskRouter.post('/create', createTask)

taskRouter.put('/update', updateTask)

taskRouter.delete('/delete/:id', deleteTask)

taskRouter.use((req, res) => {
    res.status(400).send({
        status : false,
        message : 'Route not found'
    })
})

export default taskRouter