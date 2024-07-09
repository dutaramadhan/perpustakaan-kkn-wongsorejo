const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const setupDB = require('./src/models/setupDB')
const bookRouter = require('./src/routes/bookRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

setupDB();

app.use('/books', bookRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});