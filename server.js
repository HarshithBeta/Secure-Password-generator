const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.ENV.MONGOURL);

let d = "";
function encrypt(text) {
    for(let i =0;i<text.length;i++){
            let newchar = String.fromCharCode(text[i].charCodeAt(0) + 1);
            d+= newchar;
    }
    return d;
  }
  let gg ="";
  function decrypt(text) {
    for(let i =0;i<text.length;i++){
            let newchar = String.fromCharCode(text[i].charCodeAt(0) - 1);
            gg+= newchar;
    }
    return gg;
  }

const notesSchema = {
    password: String,
    encrypted_password: String
}

const Note  = mongoose.model("Note",notesSchema);
app.get("/", function(req,res){
 res.sendFile(__dirname + "/passgen/index.html");
})
/*
To get decrypt from encrypted form use this
        password: encrypt(req.body.title),
        encrypted_password : decrypt(encrypt(req.body.title))
*/
app.post("/",function(req,res){
    let newNote = new Note({
        password: req.body.title,
        encrypted_password : encrypt(req.body.title)
    });
    newNote.save();
    res.redirect("/");
})
app.listen(3000, function(){
    console.log("server is running on on 3000");
})
