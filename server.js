var portNumber = 1234

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: portNumber});
var storage = require('node-persist');

var database = new Array()

console.log('Starting Statistiks server on port ' + portNumber);
storage.initSync();

if (storage.getItem('database').length == 0) // If we don't have a database
{
    var today = new Date()
    var mm = today.getMonth() + 1 // January is 0
    var dd = today.getDate()
    var yy = today.getFullYear()

    var day = new Object()
        day.date = String(mm + '/' + dd + '/' + yy)
        day.visitors = 0

    database.unshift(day)
    storage.setItem('database', JSON.stringify(database))
}
else
{
    database = JSON.parse(storage.getItem('database'))
}

wss.on('connection', function(socket) // Monitors connections for each client that connects...?
{
    console.log('User(s) connected')

    socket.on('message', function(message) // Do the following whenever the server receives a message...
    {
        if (message == 'visitor')
        {
            var today = new Date()
            var mm = today.getMonth() + 1 // January is 0
            var dd = today.getDate()
            var yy = today.getFullYear()

            if (database[0].date == String(mm + '/' + dd + '/' + yy))
            {
                database[0].visitors += 1
                storage.setItem('database', JSON.stringify(database))
            }
            else
            {
                var day = new Object()
                    day.date = String(mm + '/' + dd + '/' + yy)
                    day.visitors = 1

                database.unshift(day)
                storage.setItem('database', JSON.stringify(database))
            }
            console.log('Visit recorded')
        }
        else if (message == 'data_request')
        {
            storage.setItem('database', JSON.stringify(database))
            socket.send(JSON.stringify(database)) // Send the data to the client
        }
    })

    socket.on('error', function(message) // Do the following whenever the server receives an "error" message
    {
        console.log('Recovering from an "error"')
    })

    socket.on('close', function() // Wipe the player database when someone disconnects so it can rebuilt with only active players
    {
    	console.log('User(s) disconnected')
    })
})