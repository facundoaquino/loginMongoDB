const express = require('express')
const app = express()

 
const path = require('path')
const session = require('express-session');


/*---------------------- mathod override for put and delete ---------------------*/

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

/*---------------------- coockie parser ---------------------*/
const cookieParser = require('cookie-parser');
app.use(cookieParser())




/*---------------------- express session test---------------------*/


app.use(session({secret:'secreto',resave:false,saveUninitialized:true}))

app.get('/session',(req,res)=>{
	console.log(req.session.visits)
	if(!req.session.visits){
		req.session.visits = 1
	} else{
		req.session.visits++
	}
	res.send('visits '+ req.session.visits)
})


/*---------------------- required routers ---------------------*/

 
const routerForm = require('./routers/form/form')
const routerUsers = require('./routers/form/users');
const routerIndex = require('./routers');
const routerPlay = require('./routers/play');
 


/*---------------------- parse json data ---------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*---------------------- set public files ---------------------*/

app.use(express.static(path.join(__dirname, '../public')))
/*---------------------- required mongoose document to connect to data base ---------------------*/

require('./db/mongoose')

const port = process.env.PORT || 3050

/*---------------------- set a views engine ---------------------*/

app.set('view engine', 'ejs')

app.set('views', './src/views')

/*---------------------- middleware auth ---------------------*/

const auth = require('./middlewares/auth');
app.use(auth)

/*---------------------- routers ---------------------*/

app.use(routerForm)
app.use(routerUsers)
app.use(routerIndex)
app.use(routerPlay)

app.listen(port, () => {
	console.log(`Server ready on port ${port}`)
})

 