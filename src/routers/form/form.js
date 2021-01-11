const express = require('express')
const User = require('../../models/user')
const router = express.Router()

const {check,validationResult,body} = require('express-validator')

router.get('/form', (req, res) => {
	res.render('form',{errors:undefined})
})


 

router.post('/form',[
	check('name').isString().isLength({min:3}).withMessage('El nombre tiene que tener 3 caracteres como minimo'),

	check('lastname').isString().isLength({min:2}).withMessage('El apellido tiene que tener 2 caracteres como minimo'),

	body('password').custom((value)=>!value.includes('password')).withMessage('La contraseña no puede ser password'),
	check('email').isEmail().withMessage('El formato del email es incorrecto')


], async (req, res) => {
	const user = new User(req.body)

	const errors = validationResult(req)
	// console.log(errors);
 

	if(!errors.isEmpty()){
		 
		return res.render('form',{errors:errors.errors})
	}
	try {
		await user.save()
		res.render('success', { user, success: true, update: false })
	} catch (error) {
		res.render('form')
	}
})

module.exports = router
