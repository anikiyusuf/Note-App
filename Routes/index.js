const express = require('express');

const { homepage , about } = require("../Controllers/mainController")
const pageRouter = express.Router();
/**
 * App Routes 
*/
pageRouter.get('/', homepage);
pageRouter.get('/about', about);

module.exports = pageRouter ;