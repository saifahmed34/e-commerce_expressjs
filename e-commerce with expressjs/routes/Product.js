const express = require('express');
const Product = require('../models/Products');
const Category = require('../models/Category');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/count',async(req,res)=>{
  const productCount= await Product.countDocuments()
  if(!productCount){
   return res.status(500)
  }
  return res.send({
    productCount: productCount
  })

})


router.get('/feautre',async(req,res)=>{
  const productfeautre= await Product.find({
    isFeatured:true
  })
  if(!productfeautre){
   return res.status(500)
  }
  return res.send(productfeautre)

})



router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate("Category")

  if(!product){
    res.status(500).json({sucess:false})
  }
  res.send(product)
})

// POST a new product
router.post('/', async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid category");
  }

  let product = new Product({
    name: req.body.name,
    image: req.body.image,
    Stock: req.body.Stock,
    description: req.body.description,
    Price: req.body.Price,
    Category: req.body.category, // consistent key
    isFeatured: req.body.isFeatured,
  });

    product = await product.save();

    if(!product){
    res.status(500).send("Product creation failed");
  }
    res.status(201).send(product);

});

router.put('/:id', async (req, res) => {

  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid category");
  }





  const product = await Product.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    image: req.body.image,
    Stock: req.body.Stock,
    description: req.body.description,
    Price: req.body.Price,
    Category: req.body.category, 
    isFeatured: req.body.isFeatured,
  },{new:true,});
  if(!product){
    res.status(500).send('not found')
  }
  res.send(product)
})




router.delete("/:id",(req,res)=>{

  console.log(req.params.id)
    Product.findByIdAndDelete(req.params.id).then(product=>{
    if(product){
    return res.status(200).json({ sucess:true })
  }
    else{
      return res.status(404).send('product not found')
    }
    }).catch(err=>{
      return res.status(400)
    })
  })


module.exports = router;
