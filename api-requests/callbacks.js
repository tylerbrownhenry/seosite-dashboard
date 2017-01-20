
var socket = {};
function sendStatus(req,res,next){
    console.log('req',req.body);
    console.log('request/complate/' + req.body.uid);
    socket.emit('back', req.body)

    socket.emit('alert/' + req.body.uid, req.body);
}

function callbacks(_socket){
    socket = _socket;
}

module.exports.callbacks = callbacks;
module.exports.sendStatus = sendStatus;