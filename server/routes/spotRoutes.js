const spotRoutes = require('express').Router();
const spots =  require('../models/Spots');

/**
 * get all spots or get specific spot based off author
 */
spotRoutes.get('/', (req, res) => {
    
   const filteredSpots = spots.filter(spot => {
        return spot.author === req.query.author
    });

    const response = filteredSpots.length > 0 ? filteredSpots : spots;

    res.status(200).send(response);
});

/**
 * get specific spot based off index parameter
 */
spotRoutes.get("/:id", (req, res) => {
    res.status(200).send(spots.filter(spot => {
        return spot.id === parseInt(req.params.id);
    }));
}); 

module.exports = spotRoutes;
