import { TaskModel } from "../models/taskMode.js";
import ErrorHandler from "../middleware/errorHandler.js";


export const getMyTask = async (req, res, next) => {
    try {
        const task = await TaskModel.find({user: req.user._id})
        console.log(task)
        if(!task) return next(new ErrorHandler("check if the task exist", 404))
        res.status(200).json({
            success: true,
            task,
        })
    } catch (error) {
        next(error)
    }
}



export const createTask = async (req, res, next) => {
    try {
        const {title, discription} = req.body;
        const user = await TaskModel.create({title, discription, user: req.user._id})
        if(!user) return next(new ErrorHandler("something went wrong creating user", 500))
        res.status(200).json({
            success: true,
            message: "task created"
        })
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await TaskModel.findById(id)
        // if task does not exist
        if(!task) return next(new ErrorHandler("something went wrong finding task", 404))
        task.isCompleted = !task.isCompleted;
        task.save()
        res.status(200).json({
            success: true,
            message: "task updated"
        })
    } catch (error) {
        next(error)
    }
}


export const deleteTask = async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id)
        if(!task) return next(new ErrorHandler("can not find task", 404))
        res.status(200).json({
            success: true,
            message: "task deleted"
        })
    } catch (error) {
        next(error)
    }
}


