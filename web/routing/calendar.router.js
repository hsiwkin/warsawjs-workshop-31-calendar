const express = require('express');
const dayjs = require('dayjs');

const router = express.Router();

const buildCalendar = month => {
    const date = new Date(month);

    const from = dayjs(date).startOf('month').startOf('week');
    const calendarWidth = 7;
    const calendarHeight = 6;

    return Array
        .from({ length: calendarHeight * calendarWidth })
        .map((_, index) => from.add(index + 1, 'day'));
}

const buildCalendarWithDates = month => {
    const dates = buildCalendar(month);

    return dates.map(date => {
        const nrOfEvents = Math.floor(Math.random() * 10);

        const dateObj = {
            date,
            events: []
        };

        for (let i = 1; i <= nrOfEvents; ++i) {
            dateObj.events.push({
                id: i,
                string: `Event ${i}`
            });
        }

        return dateObj;
    });
}

router.get('/api/calendar', (req, res) => {
    const month = req.query.month;

    res.status(200).json({
        data: buildCalendarWithDates(month)
    });
});

module.exports = (app) => {
    app.use(router);
};
