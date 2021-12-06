const express=require('express')
const router=express.Router()
const Products = require('../models/products')

const methodOverride = require("method-override");

router.use(express.urlencoded({extended: false}))
//include the method-override package
router.use(methodOverride("_method"));


// ----------------Create----------------------

//api to create new product
router.post('/home', async (req, res) => {
    
    if(req.body.img ==='') {
        req.body.img = "http://bluelips.com/prod_images_large/bones1.jpg"
    }

    const product = await Products.create(req.body)
    res.redirect('/home')
  })

//api to delete
router.delete('/home/:id/delete', async (req, res) => {
  const product = await Products.findOneAndDelete({_id:req.params.id})
    res.redirect('/list')
});


//api to edit product
router.put("/home/:id/edit", async(req, res) => {
    const data = await Products.updateOne({_id: req.params.id}, req.body ,{new:true})
    res.redirect('/home');
  });

//api to update product quantity 
router.put("/home/:id/buy", async(req, res) => {
  const product = await Products.findById(req.params.id)
  product.qty -= 1
  const update = await product.save()
  console.log("buy", update)
  res.redirect(`/checkout`);
});
// ----------------------View Page---------------------------

// page to add new product
router.get('/new', async (req, res) => {
    res.render('new.ejs')
});

//page to view single product
router.get('/home/:id/buy', async(req, res) => {
    const { id } = req.params;
    const data = await Products.findById(id)
    res.render('single.ejs', {index: req.params.id, data: data  })
  })

//page to edit single product
router.get('/home/:id/edit', async(req, res) => {
    const { id } = req.params;
    const data = await Products.findById(id)
    res.render('edit.ejs', { index: req.params.id, data: data })
  })

//page to view checkout page after buy single product
router.get('/checkout', async(req, res) => {
  const { id } = req.params;
  const data = await Products.findById(id)
  
  res.render('checkout.ejs', { index: req.params.id, data: data })
})

// page to view all product for inventory management
router.get('/list', async (req, res) => {
    const data = await Products.find()
    res.render('list.ejs', {data: data})
});

// page to view all product
router.get('/home', async (req, res) => {
    const data = await Products.find()
    console.log(Products)
    res.render('index.ejs', {data: data})
});

// page to view all product
router.get('/', async (req, res) => {
    res.redirect('/home')
});


module.exports=router