const express = require('express');
const EventModel = require('../../models/event-model');

const router = express.Router();

router.post('/api/event', async (req, res) => {
    const model = new EventModel(req.body);
    const dbRes = await model.save();

    res.status(200).json({
        id: dbRes._id
    });
});

router.delete('/api/event/:id', async (req, res) => {
    const id = req.params.id;
    EventModel.deleteOne({_id: id}, (error) => {
        if (error) {
            console.error('error', error);
        } else {
            res.status(200).json({ id });
        }
    });
});

module.exports = (app) => {
    app.use(router);
};
