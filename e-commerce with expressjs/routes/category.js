const express = require('express')
const Category = require('../models/Category');


const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const Categorylist = await Category.find();
    res.json(Categorylist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    image:req.body.image
  },{new:true,});
  if(!category){
    res.status(500).send('not found')
  }
  res.send(category)
})


router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST a new product
router.post("/",async(req,res)=>{
    let category = new Category({
        name:req.body.name,
        image:req.body.image
    });

    category=await category.save()

    if(!category){
     return res.status(404).send('categorty not found')

    }
    res.send(category)
})

router.delete("/:id",(req,res)=>{
  Category.findByIdAndDelete(req.params.id).then(category=>{
    if(category){
    return res.status(200).json({
      sucess:true
    })}
    else{
      return res.status(404).send('category not found')
    }
    }).catch(err=>{
      return res.status(400)
    })
  })


module.exports=router
