const app = require('express')();
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
});

app.listen(process.env.PORT, () => {
    console.log(`Server was starded at http://localhost:${process.env.PORT}`);
});