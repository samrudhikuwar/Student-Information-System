const express = require('express');
// const morgan = require('morgan');
var bodyParser=require("body-parser");
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');

var studentdatabase = require('./model');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3005
const cors = require('cors')


mongoose.connect('mongodb+srv://samrudhi:Samkuwarten@freecluster.whjqs.mongodb.net/studentdatabase?retryWrites=true&w=majority', (err, client) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Connected to Database');

    }
})

// parse request to body-parser
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.headers['content-type'] = 'application/json';
    next();
});


app.post("/register", (req, res) => {
    console.log(req.body)

    const user = new studentdatabase({
        userName: req.body.Usernamer,
        email: req.body.emailr,
        password: req.body.passwordr,
        userType: req.body.Users

    });
    user.save();
    //  res.send(200);

})



app.get("/login/:uname", async(req, res) => {
    
    data= await studentdatabase.collection.findOne({"email":req.params.uname})
    // console.log(data)

    if (data===null){
        res.send("User Not Found")
    }else{
    res.send(data.email)}
    



})

app.get("/login/:User", async(req, res) => {
    
    data= await studentdatabase.collection.findOne({"userType":req.params.Users})
     console.log(data)

    if (data===null){
        res.send("User Not Found")
    }else{
    res.send(data.Users)}
})



app.get("/getData", (req, res) => {
    studentdatabase.find()
            .then(data => {
                res.send(data)
                console.log(data);
            })
    })



// app.post("/login", (req, res) => {

//     const loginuser = new studentdb({
//         email: req.body.emaill,
//         password:req.body.passwordl,

//     })
//     loginuser.save();
//     ////res.send(200);
   
// })


app.put("/updateUsers/:id", (req, res) => {

    const id = req.params.id;
    studentdatabase.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            res.send(data)

        })

});


app.delete("/deleteUsers/:id", (req, res) => {

    const id = req.params.id;
    console.log(id);

    studentdatabase.findOneAndDelete(id)
        .then(data => {
            res.send({
                data
            })

        })


});

app.use(cors())

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('register-login.html');
    }).listen(3001)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
