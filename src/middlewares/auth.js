const User = require("../models/user")

const auth =   (req,res,next)=>{


    if( req.cookies.user && !req.session.user  ){


        req.session.user = req.cookies.user 
 
        res.redirect(`/play/${req.cookies.user}`)
    }else{
        next()
    }

  
}


module.exports=auth