const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '.server.env') });

const app = express();
app.use(bodyParser.json());

app.use(
    session({
        secret: 'some-test-secret',
        resave: false,
        saveUninitialized: false,
    }),
);

const api = express.Router();

require('./auth')(api);
require('./token')(api);
app.use('/api', api);

app.listen(8080, () => {
    console.log(`Server listening on 8080`);
});
