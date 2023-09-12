import { TaskModel } from "../models/taskMode.js";


export const getMyTask = async (req, res) => {
    const task = await TaskModel.find({user: req.user._id})
    res.status(200).json({
        success: true,
        task,
    })
}



export const createTask = async (req, res) => {
    const {title, discription} = req.body;
    const user = await TaskModel.create({title, discription, user: req.user._id})
    res.status(200).json({
        success: true,
        message: "task created"
    })
}


export const updateTask = async (req, res) => {
    const {id} = req.params;
    const task = await TaskModel.findById(id)
    task.isCompleted = !task.isCompleted;
    task.save()
    res.status(200).json({
        success: true,
        message: "task updated"
    })
}


export const deleteTask = async (req, res) => {
    const task = await TaskModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "task deleted"
    })
}


