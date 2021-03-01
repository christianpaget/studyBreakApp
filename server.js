// Create AWS DynamoDB capability
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});

const client = new AWS.DynamoDB.DocumentClient();
const userTable = "Users";
const playlistsTable = "playlists";



const express = require('express');

const app = express();
const port = 8000;
app.listen(port, () => {
    console.log('Server started!');
    console.log(`Listening on port ${port}`);
});
// Get all playlist IDs
app.get("/api/userRows", (req, res) => {
    
    var params = {
        TableName: playlistsTable
    }
    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var playlists = [];
            for (var i in data.Items)
                playlists.push(data.Items[i]['playlistID']);
            console.log(playlists);

            res.contentType = 'application/json'
            res.send(playlists);
        }
    })
});