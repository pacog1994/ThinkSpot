const userRoutes = require('express').Router();
const users =  require('../models/Users');

/**
 * get all users
 */
userRoutes.get('/', (req, res) => {
    res.status(200).send(users);
});

/**
 * get a specific user based off the parameter
 */
userRoutes.get("/username?:username", (req, res) => {
    res.status(200).send(users.Users.filter(function(user) {
        return user.username === req.params.username;
    }));
}); 

module.exports = userRoutes;
