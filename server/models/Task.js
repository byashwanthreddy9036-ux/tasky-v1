import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task : {
        type : String,
        required : true,
        unique : true,
    },

    deadline : {
        type : String,
        required : true
    },

    priority : {
        type : String,
        required : true,
        enum : ['high', 'mid', 'low'],
        default : 'mid'
    },
    
    completed : {
        type : Boolean,
        required : true,
        default : false
    },
    
    createdAt : {
        type : String,
        required : true,
        default : Date.now()
    },

    updatedAt : {
        type : String,
        required : true,
        default : Date.now()
    },

});

const Task = mongoose.model('Task', taskSchema)

export default Task