const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            console.log(err)
            data = 'No Chat Exists'
        }
        res.send(
            `${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
         <input type="text" name="message" id="message">
         <input type="hidden" name="username" id="username">
         <br />
        <button type="submit">Send</button>
  </form>`);
    });
});

app.post("/", (req, res) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt", `${req.body.username} : ${req.body.message}\n`, { flag: 'a' }, (err) =>
        err ? console.log(err) : res.redirect("/")
    );
});

app.get("/login", (req, res) => {
    res.send(`<form action="/login" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('loginUsername').value)">
           <input id="loginUsername" type="text" name="username">
          <button type="submit">login</button></form>`)
});

app.post("/login", (req, res) => {
    res.redirect("/");
});

app.listen(3000);