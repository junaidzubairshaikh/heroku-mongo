const express = require('express');
const User = require('../models/user');

const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');
const router = new express.Router();

router.post('/users', async (req, res) => {

    const me = new User(req.body);
    try {
        await me.save();
        sendWelcomeEmail(me.email, me.name);
        res.status(201).send(me);
    } catch (error) {
        res.status(400).send(error);

    };
});


router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }

});

router.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then(user => {
        if (!user) {
            res.status(404).send();
        }

        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedPropertiesToUpdate = ['name', 'password', 'email', 'age'];
    const isValidProperty = updates.every((property) => {
        return allowedPropertiesToUpdate.includes(property);
    });

    if (!isValidProperty) {
        return res.status(400).send({ 'error': 'Invalid property ' });
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);
        sendCancelEmail(user.email, user.name);
        if (!user) {
            return res.status(404).send({ 'error': 'No user found' });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
