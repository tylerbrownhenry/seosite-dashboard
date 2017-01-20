'use strict';
var sendStatus = require('../../api-requests/callbacks').sendStatus

function callback(req, res, next){
    sendStatus(req,res,next)
    res.json({message:'Ok'});
}
module.exports = callback;

