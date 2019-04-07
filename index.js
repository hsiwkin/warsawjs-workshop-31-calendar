const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
const connect = require('./db');
require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
}); 

app.use(bodyParser.json());

require('./web/routing/base.router')(app);
require('./web/routing/calendar.router')(app);
require('./web/routing/event.router')(app);
require('./web/routing/day.router')(app);

(async () => {

    await connect();

    // Start web server
    app.listen(process.env.PORT, () => {
        console.log(
            `Server was started at http://localhost:${process.env.PORT}`
        )
    });

})();
