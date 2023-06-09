const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const Product = require('./models/productModel')


app.use(express.json())
app.use(express.urlencoded({extended: false}))


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
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)

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

// update a product
app.put('products/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`}) ;
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }

    catch(error){
        console.log(error.message);
        res.status(500).json( {message : error.message})
    }
})

app.delete('products/:id', async(req,res) =>{
    try{

        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`}) ;
            }

        res.status(200).json()
    }

    catch(error){
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
