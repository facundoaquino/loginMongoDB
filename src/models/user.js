const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
	},
	 
	password: {
		type: String,
		required: true,
		minLength: 7,
	},
	email: {
		type: String,
		required:true,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error ('Email is invalid')
			}
		}



	},
	admin:{
		type:Boolean,
		default: false
	}
})

userSchema.pre('save', async function (next) {
	const user = this

	if (user.isModified('password')) {
		user.password = await bcrypt.hashSync(user.password, 8)
	}
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
