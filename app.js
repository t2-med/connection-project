const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
// convert yaml to json
let jsonSwaggerDocument = YAML.load('./swaggers/swagger.yaml');

const routes = require('./routes');

const replaceSwaggerEnvironmentVariable = require('./utils/swagger-environment');

// const env = require('dotenv').config();
const env = require('dotenv').config({path: path.join(__dirname,`.env.${process.env.NODE_ENV}`)});

const app = express();

jsonSwaggerDocument = replaceSwaggerEnvironmentVariable(jsonSwaggerDocument, env);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(process.env.BASE_PATH_DOCS, swaggerUi.serve, swaggerUi.setup(jsonSwaggerDocument));
app.get('/', (req, res) => res.redirect(process.env.BASE_PATH_DOCS));
app.use(process.env.BASE_PATH , routes);

app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

module.exports = app;
