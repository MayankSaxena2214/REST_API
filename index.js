const express=require("express");
const app=express();
var methodOverride = require('method-override')

const { v4: uuidv4 } = require('uuid');
const path=require("path");

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public/css")));

let posts=[
    {
        id:uuidv4(),
        username:"apna college",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"Ashok",
        content:"I am doing DSA"
    }
    ,
    {
        id:uuidv4(),
        username:"Mayank",
        content:"I am doing WEB DEV"
    }
];


app.listen(3000,()=>{
    console.log("App is listening on the port ");
});
app.get("/register",(req,res)=>{
    res.send("Registre route")
})
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    // console.log(username);
    if(username){
        posts.push({
            id:uuidv4(),
            username:username,
            content:content,

        })
    }
    else{
        res.render("error.ejs");
    }
    res.redirect("/posts")
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    console.log(id);
   
    // let post;
    // for(allpost of posts){
    //     if(allpost.id==id){
    //         post=allpost;
    //     }
    // }
    let post=posts.find((p)=> p.id===id);
    console.log(post);
    if(post)
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    console.log(id);
    let newcontent=req.body.content;
    console.log(newcontent);
    let post=posts.find((p)=>p.id===id);
    console.log(post);
    post.content=newcontent;

    console.log("Hello world")
    res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>p.id===id);
    // console.log(post);
    if(post)
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>p.id===id);
    posts=posts.filter((p)=>p.id!=id);
    res.redirect("/posts");
})

