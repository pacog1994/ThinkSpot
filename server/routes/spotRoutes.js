const spotRoutes = require('express').Router();
const spots =  require('../models/Spots');

/**
 * get all spots or get specific spot based off author
 */
spotRoutes.get('/', (req, res) => {
    
   const filteredSpots = spots.Spots.filter(function(spot) {
        return spot.author === req.query.author
    });

    const response = filteredSpots.length > 0 ? filteredSpots : spots;

    res.status(200).send(response);
});

/**
 * get specific spot based off index parameter
 */
spotRoutes.get("/:id", (req, res) => {
    res.status(200).send(spots.Spots.filter(function(spot) {
        return spot.id === parseInt(req.params.id);
    }));
}); 

/**
 * get spots based off author query
 */
spotRoutes.get("/", (req, res) => {
    console.log(req.query);
    
}); 

// /**
//  * get specific spot based off author query and index parameter
//  */
// spotRoutes.get("?author=author/:id", (req, res) => {
    
//     const spotsByAuthor = spot.Spots.filter(function(spot) {
//         return spot.author === req.query.author;
//     })

//     res.status(200).send(spotsByAuthor[req.params.id]);
// }); 

module.exports = spotRoutes;
