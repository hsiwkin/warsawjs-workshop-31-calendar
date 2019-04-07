const express = require('express');

const router = express.Router();

router.get('/api/calendar', (req, res) => {
    res.status(200).json({
        data: [
            {
                date: '2018-09-12',
                events: [{
                    id: 1,
                    string: 'Some Event'
                }]
            }
        ]
    });
});

module.exports = (app) => {
    app.use(router);
};
