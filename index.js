const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const StudentModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/student")


app.post ("/login",(req,res)=>{
    const {email,password}= req.body;
    StudentModel.findOne({email,password})
    .then(user =>{
        if(user){
        if(user.password === password) {
            res.json("Success")
        }
        else{
            res.json("the password is incorrect")
        }
    }
        else {
            res.json("No record exists")
        }
    })
})

app.post('/register',(req,res)=>{
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))
     
})

app.listen(3001,()=>{
     console.log("server is running")
})