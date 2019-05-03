const spotRoutes = require('express').Router();
const spots =  require('../../database/models/Spots');
const config = require('../../config/config.json')

//Connect to AWS
var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient({
      endpoint: new AWS.Endpoint(config.aws.endpoint),
      region: "us-east-1"
})

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
 * description: Get specific spot based off param requested
 * parameter: Unique id of spot
 */
spotRoutes.get("/:id", (req, res) => {
    res.status(200)
    .send(spots.find(spot => {
        return spot.id === parseInt(req.params.id);
    }))
}); 

/**
 * @api [post] /spots
 * description: Insert spot
 */
spotRoutes.post("/", (req, res) => {
    //validation

    //construct params
    var params = {
        Item: req.body,
        ReturnValues: "UPDATED_NEW",
        TableName: "Spots"
    }

    docClient.put(params, (err, data) => {
        if (err) 
            console.log("Failure: "+err+"\n\n", "Error Stack\n"+err.stack)
        else
            console.log("Success: Inserted New Spot", res.status(200).send(data))
    })
})

/**
 * @api [put] /spots/:author/:id
 * description: Update spot based off specific param/composite key 
 * effects only the title and description.
 * parameter:
 *  author: User the spot belongs to
 *  id: Unique id of spot
 * example: /spots/user1/0
 */
spotRoutes.put("/:author/:id", (req, res) => {
    //construct params
    var params = {
        ConditionExpression: ":desc != null || :ti != null",
        Item: req.body,
        Key: {
            "author": req.params.author,
            "spotId": parseInt(req.params.id)
        },
        ExpressionAttributeNames: {
            "#d": "date"
        },
        ExpressionAttributeValues: {
            ":d": new Date().getTime(),
            ":desc": req.body.description,
            ":ti": req.body.title
        },
        
        ReturnValues: "UPDATED_NEW",
        TableName: "Spots",
        UpdateExpression: "set #d = :d, description = :desc, title = :ti",
    }

    docClient.update(params, (err, data) => {
        if (err)
            console.log("Failure: "+err+"\n\n", "Error Stack\n"+err.stack)
        else
            console.log("Success: Updated Item",  res.status(200).send(data))
    })
})

/**
 * @api [put] /spots/:author/:id/upvote
 * description: Upvotes spot likes by +1 based off specific param/composite key
 * parameter:
 *  author: User the spot belongs to
 *  id: Unique id of spot
 */
spotRoutes.put("/:author/:id/upvote", (req, res) => {
    //construct params
    var params = {
        Key: {
            "author": req.params.author,
            "spotId": parseInt(req.params.id)
        },
        ExpressionAttributeValues: {
            ":n": 1
        },
        ReturnValues: "UPDATED_NEW",
        TableName: "Spots",
        UpdateExpression: "set likes = likes + :n"
    }

    docClient.update(params, (err, data) => {
        if (err)
            console.log("Failure: "+err+"\n\n", "Error Stack\n"+err.stack)
        else
            console.log("Success: Updated Item",  res.status(200).send(data))
    })
})

/**
 * @api [put] /spots/:author/:id/downvote
 * description: Downvotes spot likes by -1 based off specific param/composite key
 * parameter:
 *  author: User the spot belongs to
 *  id: Unique id of spot
 */
spotRoutes.put("/:author/:id/downvote", (req, res) => {
    //construct params
    var params = {
        ConditionExpression: "likes > :z",
        Key: {
            "author": req.params.author,
            "spotId": parseInt(req.params.id)
        },
        ExpressionAttributeValues: {
            ":n": -1,
            ":z": 0 
        },
        ReturnValues: "UPDATED_NEW",
        TableName: "Spots",
        UpdateExpression: "set likes = likes + :n"
    }

    docClient.update(params, (err, data) => {
        if (err)
            console.log("Failure: "+err+"\n\n", "Error Stack\n"+err.stack)
        else
            console.log("Success: Updated Item",  res.status(200).send(data))
    })
})

/**
 *@api [delete] /spots/:id
 * description: Delete spot specified by id
 * parameter: 
 *  author: User the spot belongs to
 *  id: Unique id of spot
 */
spotRoutes.delete("/:author/:id", (req, res) => {
    var params = {
        Key: {
            "author": req.params.author,
            "spotId": parseInt(req.params.id) 
        },
        TableName: "Spots"
    }
    docClient.delete(params, (err, data) => {
        if (err)
            console.error("Failure: "+err)
        else
            console.log("Success: Deleted Item", res.status(200).send(data))
    })
})

module.exports = spotRoutes;
