import Task from '../models/Task.js'

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        if (!tasks || tasks.length == 0) {
            res.send({
                status: true,
                message: 'No Tasks Available',
                data: []
            })
            return
        }
        res.send({
            status: true,
            message: 'Tasks fetched Successfully',
            data: tasks
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error',
            error: error
        })
    }
}

const getTaskByID = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || id.length != 24) {
            res.send({
                status: false,
                message: 'Invalid ID',
            })
            return
        }
        const task = await Task.findById(id)
        if (!task || task.length == 0) {
            res.status(400).send({
                status: true,
                message: 'No Such Task',
                data: {}
            })
            return
        }
        res.send({
            status: true,
            message: 'Tasks fetched Successfully',
            data: task
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error',
            error: error
        })
    }
}

const createTask = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                status: false,
                message: 'Invalid Input',
            })
            return
        }

        let { task, deadline, priority } = req.body

        if (!task || !deadline) {
            res.status(400).send({
                status: false,
                message: 'Incompleted or Invalid Data',
            })
            return
        }

        const exisitngTask = await Task.findOne({ task: task })

        if (exisitngTask) return res.send({
            status: false,
            message: 'Task already exists',
        })

        if (!(['high', 'mid', 'low']).includes(priority)) {
            priority = 'mid'
        }

        const newTask = Task({ task, deadline, priority })
        await newTask.save()
        res.status(200).send({
            status: true,
            message: 'Task created Successfully',
            data: newTask
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error',
            error: error
        })
    }
}

const updateTask = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                status: false,
                message: 'Invalid Input',
            })
            return
        }

        let { id, task, deadline, priority, completed } = req.body

        if (!id || id.length != 24) {
            res.status(400).send({
                status: false,
                message: 'Invalid ID'
            })
            return
        }

        if (!(task || deadline || priority || (completed != undefined))) {
            return res.status(400).send({
                status: false,
                message: 'Incomplete data',
            })
        }

        // const exisitngTaskname = await Task.findOne({ task: task })

        // if (exisitngTaskname) return res.send({
        //     status: false,
        //     message: 'Task with same name already exists',
        // })
        if (!(['high', 'mid', 'low']).includes(priority)) {
            return res.status(400).send({
                staus: false,
                message: 'Invalid Prioirty'
            })
        }
        const updatedAt = new Date().toLocaleString()
        const existingTask = await Task.findByIdAndUpdate(id, { completed, task, deadline, priority, updatedAt }, { runValidators: true, new: true })

        if (!existingTask) return res.send({
            status: false,
            message: 'Task not found',
        })

        res.status(200).send({
            status: true,
            message: 'Task updated Successfully',
            data: existingTask
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error',
            error: error
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || id.length != 24) {
            res.send({
                status: false,
                message: 'Invalid ID',
            })
            return
        }
        const task = await Task.findByIdAndDelete(id)
        if (!task || task.length == 0) {
            res.status(400).send({
                status: true,
                message: 'No Such Task',
                data: {}
            })
            return
        }
        res.send({
            status: true,
            message: 'Tasks deleted Successfully',
            data: task
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: 'Internal server error',
            error: error
        })
    }
}

export { getAllTasks, getTaskByID, createTask, updateTask, deleteTask }