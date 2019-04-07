const express = require('express');
const dayjs = require('dayjs');
const EventModel = require('../../models/event-model');
const router = express.Router();

router.get('/api/day', async (req, res) => {
    const day = req.query.date;
    
    const [start, end] = [
        dayjs(day).startOf('day'),
        dayjs(day).endOf('day')
    ];

    const events = await EventModel.find({time: {
        $gte: start,
        $lt: end
    }});

    res.status(200).json({
        data: events
    });
});

module.exports = (app) => {
    app.use(router);
};
