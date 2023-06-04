const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const Product = require('./models/productModel')


app.use(express.json())


app.get('/', (req,res)=>{
    res.send('Hello Node API')
})

app.get('/blog', (req,res) =>{

    res.send('Hello Node API')
})


app.get('/products', async (req,res) =>{
    try{
        const product = await Product.find({});
        res.status(200).json(product)

    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/products/:id', async (req,res) =>{

    try{
       

    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }

})

app.post('/product', async(req,res)=>{

    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    }
    catch(error){
        console.log(error.message);
        res.status(500).json( {message : error.message})
    }
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
