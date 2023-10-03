const express = require("express");
const app = express();
const port = 8080;
const {v4: uuid4} = require("uuid");
app.use(express.urlencoded( { express : true}));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));



let posts = [
    {
        id:uuid4(),
        username : "Apnacollege",
        content : "I love Coding"
    },
    {
        id:uuid4(),
        username : "ShradhaKhapra",
        content : "HardWork is important to achieve Goal" 
    },
    {
        id:uuid4(),
        username : "Rahulkumar",
        content : "I got Selected in Microsoft"
    },
    {
        id:uuid4(),
        username : "vivek",
        content : "I got Selected in Microsoft"
    }
];
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/posts" ,(req,res) => {
    // res.send("serving working well");
    console.log("Hello ! calling for server");
    res.render("index.ejs", { posts});
});

app.get("/posts/new",(req, res) => {
    res.render("new.ejs");
}); 

app.post("/posts", (req,res) => {
    let {username , content} = req.body;
    let id = uuid4();
    posts.push({id,username, content});
    // res.send("post request working ");
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    console.log(post);
    console.log("request working");
    res.render("show.ejs", {post});
}); 

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    // console.log(newContent);
    // console.log(id);

    let currPost = posts.find( (p) => id == p.id);
    currPost.content = newContent;
    console.log(currPost.content);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let currPost = posts.find( (p) => id == p.id);
    res.render("edit.ejs",{currPost});
});


app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;    
    posts = posts.filter( (p) => id != p.id);
    console.log(`Post associated with ${id} deleted !`);
    res.redirect("/posts");
});
app.listen(port, () => {
    console.log("Listening to port : 8080");
});