const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../src/config/baseConfig');
const connectDatabase = require('../src/config/databaseConfig');
const SwaggerUI = require('swagger-ui-express');
const SwaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AuthLearn API",
            version: "1.0.0",
            description: "A simple Auth API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
            {
                url: "https://auth-base-learn.herokuapp.com",
            },
        ],
    },
    apis: ["./src/router/**.js"],
};

const specs = SwaggerJSDoc(options);

const app = express()

app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(specs));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', require('./router/auth.routes'));
app.use('/api/v1/user', require('./router/user.routes'));

app.get('/', (req, res) => {
    res.send('API for Authentication on Node JS');
});

const PORT = process.env.PORT || config.PORT;

connectDatabase().then(() => {
    console.log('Connection started');
});

app.listen(PORT, () => {
   console.log(`Server is listening at PORT: ${PORT}`);
});