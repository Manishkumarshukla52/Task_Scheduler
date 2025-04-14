const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Create Task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

// Get All Tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Update Task
router.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.send(task);
});

// Delete Task
router.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ success: true });
});

module.exports = router;
