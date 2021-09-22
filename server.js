// Create AWS DynamoDB capability
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});
const bcrypt = require('bcrypt');
const client = new AWS.DynamoDB.DocumentClient();
const userTable = "sb-users";
const playlistsTable = "playlists";

const bodyParser = require("body-parser");

const cors = require('cors');
const path = require('path');
const express = require('express');

const app = express();
const port = 8000;
const server = app.listen(port, () => {
    console.log('Server started!');
    console.log(`Listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(cors());


//Test function

app.get('/version', (req, res) => {
    res.json({ version: '1.0.0' });
});

//Spotify Login

app.post("/api/spotify/login", (req, res)=>{
  const spotifyID = "a466c513c83a43809ffe7f0573d24418";
  const spotifySecret = "0575752dbd7e41ac964f63c60342308e";
  redirect_uri = req.body.redirect_uri;
  console.log("Spotify log-in received")
  const spotifyLink = "https://accounts.spotify.com/authorize?client_id=" + spotifyID + "&redirect_uri=" + redirect_uri
  + "&scope=user-modify-playback-state%20streaming%20user-read-private%20user-read-email&response_type=token" 
  res.redirect(spotifyLink);
});

//Login

app.post("/api/login", (req, res)=>{
    if(!req.body){
        console.log("?");
        return res.status(400).send("Bad Request");
    }
    //console.log(req.body);
    var usernameData = req.body.username;
    var passwordData = req.body.password
    console.log(usernameData);
    console.log(passwordData);
    /*hash = bcrypt.hash(password, 10, function(err, hash)=>{
        //Add password encryption
    })*/

    client.get({
        TableName: userTable,
        Key: {
            username: usernameData
        }
    })
    .promise().then(data => {
        //console.log(data.Item);
        var pwd = data.Item['password'];
        //console.log(pwd);
        //console.log(passwordData)
            if(pwd == passwordData){
                console.log("Success");
                res.json({message: "Success", user: usernameData});
                res.statusMessage = "Success"
                res.status(200).send();
            }
            else{
                res.statusMessage = "Failed";
                console.log("failed");
                res.send();
            }
    }).catch(console.error);

})
//Create User
app.post("/api/new/user", (req, res) => {
    //res.send();
})
//Create Playlist
app.post("api/new/playlist", (req, res) => {
    if(!req.body){
        console.log("?");
        return res.status(400).send("Bad Request");
    }
    res.send();
})
//Get Playlist
//Get all playlist IDs - Done
app.get("/api/userRows", (req, res) => {
    
    var params = {
        TableName: playlistsTable
    }
    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data.Items);
            var playlists = [];
            for (var i in data.Items){
                var singlePlaylistResponse = data.Items[i];
                var singlePlaylist = {
                    playlistID: singlePlaylistResponse['playlistID'],
                    step1choice: singlePlaylistResponse['step1choice'],
                    step1search: singlePlaylistResponse['step1search'],
                    step2choice: singlePlaylistResponse['step2choice'],
                    step2search: singlePlaylistResponse['step2search'],
                    breaktime: singlePlaylistResponse['breaktime'],
                    studytime: singlePlaylistResponse['studytime'],
                    userID: singlePlaylistResponse['userID']
                }
                playlists.push(singlePlaylist);
            }
                //playlists[i].push(data.Items[i]['userID']);
            console.log(playlists);

            res.contentType = 'application/json'
            res.json(playlists);
            //res.send(playlists);
        }
    })
});

// Delete Playlist by ID

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(500).json({ message: err.message });
});

app.use(express.static(path.join( __dirname, './dist/spotify-study-break')));

module.exports = app;