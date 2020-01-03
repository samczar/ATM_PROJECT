const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config')

// Set up expres app
const app = express()

mongoose.connect(config.MONGO_URI)

mongoose.Promise = global.Promise

app.use(express.static('public'))
app.use(cors())

app.use(body_parser.json())

//Initialise Routes
app.use('/api/v1', require('./routes/api'))

app.get('/createfingerMakerApi', createFingerPrint)
app.get('/searchFingerMakerApi', searchFingerPrint)
app.get('/deleteFingerMakerApi', deleteFingerPrint)

function createFingerPrint(req, res) {
	var spawn = require('child_process').spawn
	var process = spawn('python', [
		'./routes/example_enroll.py'	
	])
	process.stdout.on('data', function(data) {
		console.log(data.toString())
		res.send(data.toString())
	})
}

function searchFingerPrint(req, res) {
	var spawn = require('child_process').spawn
	var process = spawn('python', [
		'./routes/example_search.py'	
	])
	process.stdout.on('data', function(data) {
		console.log(data.toString())
		res.send(data.toString())
	})
}

function deleteFingerPrint(req, res) {
	var spawn = require('child_process').spawn
	var process = spawn('python', [
		'./routes/example_delete.py'	
	])
	process.stdout.on('data', function(data) {
		console.log(data.toString())
		res.send(data.toString())
	})
}


//Error Handling Middleware
app.use((err, req, res, next) => {
	res.status(422).send({ error: err.message })
})

const port = config.port || 3001

//Listen for Request
app.listen(port, () => {
	console.log(`Listening for request on ${port}`)
})
