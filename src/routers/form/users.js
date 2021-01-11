const express = require('express')
const User = require('../../models/user')

const router = express.Router()

router.get('/users', async (req, res) => {
	const users = await User.find({})

	res.render('users', { users })
})

router.get('/users/edit', async (req, res) => {
	res.render('edit-user-form')
})

router.get('/users/edit/find', async (req, res) => {
	const users = await User.find({})

	const usersFind = users.filter((user) => user.lastname.includes(req.query.lastname.toLowerCase()))

	res.render('users-find', { usersFind })
})

router.get('/users/edit/:id', async (req, res) => {
	const user = await User.findById(req.params.id)
	console.log(user)

	res.render('user-update-form', user)
})

router.put('/users/edit/:id', async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body)
	res.render('success', { user: req.body, update: true })
})

module.exports = router
