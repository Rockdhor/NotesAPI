const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
const port = 3000
const path = require('path');
const Database = require("@replit/database")
const db = new Database()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

//app.get('/createEntry.js', function(req, res) {
//  res.sendFile(path.join(__dirname, 'templates/createEntry.js'));
//});

app.post('/', function (req, res) {
  let data = req.body;
  if (data["password"] == process.env['password']) {
    let posts = 0;
    db.get("posts").then(value => {posts = value})
    file = {"title": data["title"],
          "content": data["content"],
          "created-at": moment().format('YYYY MM DD, hh:mm:ss')
            }
    db.set("post-"+posts, file).then(() => {})
    posts+=1
    db.set("posts", posts).then(() => {})
    res.status(200).send('Post ' + posts + ' created succesfully.');
  } else {
    res.status(403).send("Unauthorized user.")
  }

  
  //console.log(res);
});
app.get('/keys', (req, res) => {
  db.list().then(keys => {
    console.log(keys)
  })
})

app.get('/post-0', (req,res) => {
  db.get("post-0").then(value => {
    console.log(value)
    res.status(200).send(value)
  })
})

app.get('/latest', (req, res) => {
  let posts = 0;
  db.get("posts").then(n => {
    posts = n
  })
  db.get("post-" + posts).then(post => {
          console.log(post)
          res.status(200).send(post)
        })
    
  
})


app.listen(port, () => {
  // Code.....
  console.log("alive at https://NotesAPI.rockdhor.repl.co")
})




