require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Db connection
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Routes
const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter);

const trainersRouter = require('./routes/trainers.js')
app.use('/trainers', trainersRouter);

const adminsRouter = require('./routes/admins.js')
app.use('/admins', adminsRouter);

const matchesRouter = require('./routes/matches.js')
app.use('/matches', matchesRouter);

const citiesRouters = require('./routes/cities.js')
app.use('/utils/cities', citiesRouters);

const breedRouters = require('./routes/dogBreeds.js')
app.use('/utils/breeds', breedRouters);

const expertiseRouter = require('./routes/expertise.js')
app.use('/utils/expertise', expertiseRouter);

const chatsRouter = require('./routes/chats.js')
app.use('/chats', chatsRouter);

// Listner
app.listen(process.env.PORT || 4000, () => console.log('Server up and running on port'));