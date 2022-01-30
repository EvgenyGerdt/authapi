const express = require('express')
const bodyParser = require('body-parser');
const config = require('../src/config/baseConfig');
const connectDatabase = require('../src/config/databaseConfig');

const app = express()

connectDatabase().then(() => {
    console.log('Connection started');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API for Authentication on Node JS');
});

app.use('/api/v1/auth', require('./router/auth.routes'));
app.use('/api/v1/user', require('./router/user.routes'));

app.listen(config.PORT, () => {
   console.log(`Server is listening at PORT: ${config.PORT}`);
});