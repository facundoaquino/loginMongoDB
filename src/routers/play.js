const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/play',async (req,res)=>{

    const user = await User.findOne({email:req.body.email}).exec()
    

    const pass = user ?  bcrypt.compareSync(req.body.password,user.password) : false
    
    if(user&&pass){

        req.session.user=user._id
        res.cookie('user', user._id,{maxAge:20000})


        res.redirect(`/play/${user._id}`)
    }else{
        res.redirect('/')
    }
   
})


router.get('/play/:id',async (req,res)=>{

    const user = await User.findById(req.params.id)
    // console.log(user)

    if(req.session.user && user){

        res.render('play/index',user)
    }else{
        res.redirect('/')
    }

})



module.exports=router