import asyncHandler from 'express-async-handler'
import Task from '../models/taskModel.js'

// GET /api/tasks
export const getTasks = asyncHandler( async (req, res) => {
    const tasks = await Task.find({}).populate('mentor', 'id name').sort({createdAt: -1});
    res.json(tasks);
});

// POST /api/tasks
export const addTask = asyncHandler( async (req, res) => {
    const {name} = req.body;

    const task = new Task({name, mentor: req.mentor._id});
    const createdTask = await task.save();

    const tasks2 = await Task.findById(createdTask._id).populate('mentor', 'id name');

    res.status(201).json(tasks2)
});

// PUT /api/tasks/:id
export const updateTask = asyncHandler( async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(task) {
        task.name = req.body.name || task.name
        task.isCompleted = req.body.isCompleted || task.isCompleted 
    }
    
    await task.save();

    res.json(req.body)
});

// DELETE /api/tasks/:id
export const deleteTask = asyncHandler( async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(task) {
        await task.remove();
        res.json({ message: 'Task Deleted' });
    } else {
        res.status(404);
        throw new Error('Task Not Found')
    }
});

