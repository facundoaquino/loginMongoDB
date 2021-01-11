const User = require("../models/user")

const checkSession = async (req,res,next)=>{

 
    if(req.session.user){

        const {admin} = await User.findById(req.session.user)
         console.log(admin)
         res.locals.admin=admin
        res.redirect(`/play/${req.session.user}`)

        return
    }

    next()



}

module.exports=checkSession