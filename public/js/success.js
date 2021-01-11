const redirect = (path) => {
	setTimeout(() => {
		window.location = path
	}, 2000)
}

window.onload = redirect('/form')
