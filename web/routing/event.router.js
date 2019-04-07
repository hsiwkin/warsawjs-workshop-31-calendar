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

module.exports = (app) => {
    app.use(router);
};
