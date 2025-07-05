const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const Userlist = await User.find().select('-passwordHash');
    res.send(Userlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash')

  if(!user){
    res.status(500).json({sucess:false})
  }
  res.send(user)
})


// POST a new product

router.post('/', async (req, res) => {

  let user = new User({
    name: req.body.name,
    email:req.body.email,
    passwordHash:bcrypt.hashSync(req.body.password,10) ,
    phone:req.body.phone,
    city:req.body.city,
    isadmin:req.body.isadmin
  });

    user = await user.save();

    if(!user){
    res.status(500).send("user  creation failed");
  }
    res.status(201).send(user);

});

router.post("/login",async(req,res)=>{
  const secret = process.env.secret 
  const useremail =await User.findOne({email:req.body.email})
  if(!useremail){
   res.status(500).send("user  not found");
  }

  if(useremail && bcrypt.compareSync(req.body.password,useremail.passwordHash)){

        const token = jwt.sign({
          userId:useremail._id,
          isadmin:useremail.isadmin
        },secret,
      {expiresIn:"1d"})


        res.status(200).send({
          email:useremail.email,
          token:token
        })
  }else{
    res.status(400).send("email or password not found")
  }
 

})


module.exports=router
