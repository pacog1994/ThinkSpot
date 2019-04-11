const spotRoutes = require('express').Router();
const spots =  require('../../database/models/Spots');

/**
 * @api [get] /spots
 * description: Returns all spots from the system that the user has access to
 * responses:
 *  200:
 *      description: a list of spots.
 */
spotRoutes.get('/', (req, res) => {
    
   const filteredSpots = spots.filter(spot => {
        return spot.author === req.query.author
    });

    const response = filteredSpots.length > 0 ? filteredSpots : spots;

    res.status(200)
    .send(response)
});

/**
 * @api [get] /spots/:id
 * get specific spot based off index parameter
 */
spotRoutes.get("/:id", (req, res) => {
    res.status(200)
    .send(spots.find(spot => {
        return spot.id === parseInt(req.params.id);
    }))
}); 

module.exports = spotRoutes;
