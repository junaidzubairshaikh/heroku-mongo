const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then((result) => {
        res.status(201).send(task);
    }).catch(error => {
        res.status(400).send(error);
    })
});

router.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then(task => {
        res.send(task);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedPropertiesToUpdate = ['description', 'completed'];
    const isValidProperty = updates.every((property) => {
        return allowedPropertiesToUpdate.includes(property);
    });

    if (!isValidProperty) {
        return res.status(400).send({ 'error': 'Invalid property ' });
    }
    try {
        const task = await Task.findById(_id);

        allowedPropertiesToUpdate.forEach(prop=>{
            task[prop] = req.body[prop];
        });

        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        await task.save();
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        return res.status(500).send(error);
    }
});


router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).send({ 'error': 'No task found' });
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;