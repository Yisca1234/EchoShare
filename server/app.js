const express = require('express');
require('express-async-errors');
const cors = require('cors');
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

// app.use(middleware.unknownEndpointHandler);
// app.use(middleware.errorHandler);

module.exports = app;
