const express = require('express');
const cors = require('cors');
const router = require('./router');
const handlerError = require('./middlewares/errorHandler');
const { IMAGES_BASE_PATH } = require('./constants');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public/images', express.static(IMAGES_BASE_PATH));
app.use(router);
app.use(handlerError);

module.exports = app;
