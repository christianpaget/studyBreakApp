// Create AWS DynamoDB capability
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});
const bcrypt = require('bcrypt');
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
//Login

app.get("/api/login", (req, res)=>{
    
    var usernameData = req.username;
    var password = req.password
    /*hash = bcrypt.hash(password, 10, function(err, hash)=>{
        //Add password encryption
    })*/

    var params = {
        TableName: userTable,
        KeyConditionExpression: {username: usernameData}
    }

    client.scan(params, (err, data) =>{
        if(err){
            console.log(err);
            res.status(404);
        } else {
            var pwd = data.Items['password'];
            console.log(pwd);
        }

    });
})
//Create User
//Create Playlist
//Get Playlist

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

module.exports = app;