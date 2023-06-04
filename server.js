const express = require('express')
const app = express()
const mongoose  = require('mongoose')


app.get('/', (req,res)=>{
    res.send('Hello Node API')
})

app.get('/blog', (req,res) =>{
    res.send('Hello Blog, my name is')
})



mongoose.connect("mongodb://localhost:27017/devamine")
.then(() => {
    console.log('connected to mongoDB')
    app.listen(3000, ()=>{
        console.log('NODE API is running on port 3000')
    })
}).catch((error)=>{
    console.log(error)
})
