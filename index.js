const app = require('express')();
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
});

require('./web/routing/base.router')(app);
require('./web/routing/calendar.router')(app);

app.listen(process.env.PORT, () => {
    console.log(`Server was starded at http://localhost:${process.env.PORT}`);
});