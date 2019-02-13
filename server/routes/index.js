const routes = require('express').Router();
const userRoutes = require('./userRoutes');
const spotRoutes = require('./spotRoutes');

routes.use('/users', userRoutes);
routes.use('/spots', spotRoutes);

module.exports = routes;