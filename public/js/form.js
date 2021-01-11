/*---------------------- dom references ---------------------*/

const arrowOption = document.getElementById('arrow')
const options = document.getElementById('options')

arrowOption.addEventListener('click', () => {
	options.classList.toggle('active')
	arrowOption.classList.toggle('rotate')
})
