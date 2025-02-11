const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');

const middleware = require('./utils/middleware');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.resolve(__dirname, './public/')));
app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));

module.exports = app;
