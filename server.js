require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', (error) => console.log('Connected to Database'));

app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);
const carsRouter = require('./routes/cars');
app.use('/cars', carsRouter);
const wheelsRouter = require('./routes/wheels');
app.use('/wheels', wheelsRouter);

app.listen(3000, () => console.log('Server Started'));