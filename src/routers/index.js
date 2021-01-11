const express = require('express');
const checkSession = require('../middlewares/checkSession');

const router = express.Router()

 
 

router.get('/', checkSession ,(req,res)=>{

    
    res.render('index/index')
})

router.get('/logout',(req,res)=>{

    res.clearCookie('user')
    
    req.session.destroy(err=>{
        
    })

    res.redirect('/')
})

 


module.exports=router