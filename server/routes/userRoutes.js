const userRoutes = require('express').Router();
const users =  require('../../database/models/Users');

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
    res.status(200).send(users.filter(user => {
        return user.username === req.params.username;
    }));
}); 

module.exports = userRoutes;
