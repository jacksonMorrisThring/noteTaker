const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notesRouter.js');


const app = express.Router();

app.use('/notes', notesRouter);


module.exports = app;
// module.exports = notesRouter;
