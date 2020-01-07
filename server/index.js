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

function createFingerPrint(req, res) {
	var spawn = require('child_process').spawn
	var process = spawn('python', ['./routes/example_enroll.py'])

	process.stdout.on('data', function(data) {
		var createFingerPrintMessage = data.toString()
		console.log(createFingerPrintMessage)

		//var regex = /#[0-9]+$/g
		var duplicate = 'Template already exists'
		var error = 'Operation failed!'
		var checkStringRegex = /(?:^|\W)duplicate(?:$|\W)/
		var errorStringRegex = /(?:^|\W)error(?:$|\W)/
		var regex = /#\d+/g
		var foundArray = createFingerPrintMessage.match(regex)
		var errorMessageArray = 	createFingerPrintMessage.match(errorStringRegex)
		var duplicateMessageArray = 	createFingerPrintMessage.match(checkStringRegex)
		console.log('duplicateArray ', foundArray)
		console.log('errorArray ', errorMessageArray )
		console.log('foundArray ', duplicateMessageArray)
		var valueText = JSON.stringify(foundArray)
		console.log('valueText ', valueText)
		var regexNumber = /[0-9]/g
		var getNumber = valueText.match(regexNumber)

		if (getNumber == null) {
			console.log('Null value')
		} else {
			var mainValue = getNumber.join('')
			console.log('number ', mainValue)
		}

		res.send({ info: mainValue, error: '', duplicate: '' })
	})
}

function searchFingerPrint(req, res) {
	var spawn = require('child_process').spawn
	var process = spawn('python', ['./routes/example_search.py'])
	process.stdout.on('data', function(data) {
		var createFingerPrintMessage = data.toString()
		console.log(createFingerPrintMessage)

		//var regex = /#[0-9]+$/g
		var regex = /#\d+/g
		var foundArray = createFingerPrintMessage.match(regex)
		console.log('foundArray ', foundArray)
		var valueText = JSON.stringify(foundArray)
		console.log('valueText ', valueText)
		var regexNumber = /[0-9]/g
		var getNumber = valueText.match(regexNumber)

		if (getNumber == null) {
			console.log('Null value')
			
		} else {
			var mainValue = getNumber.join('')
			console.log('number ', mainValue)
		}

		res.send({ info: mainValue, error: '', duplicate: '' })
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
