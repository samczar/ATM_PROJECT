const PiCamera = require('pi-camera')
const spawn = require('child_process').spawn

// const myCamera = new PiCamera({
// 	mode: 'photo',
// 	output: `${__dirname}/public/images/user${Date.now()}.jpg`,
// 	width: 640,
// 	height: 480,
// 	nopreview: true
// })

// myCamera
// 	.snap()
// 	.then(result => {
// 		// Your picture was captured
// 		console.log('snap')
// 	})
// 	.catch(error => {
// 		// Handle your error
// 	})
// module.exports = myCamera

const randomAccountGenerator = () => {
	let now = Date.now().toString() // '1492341545873'
	// pad with extra random digit
	now += now + Math.floor(Math.random() * 10)
	// format
	return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
}

const fingerPrintEnroll = (req, res) => {
	var process = spawn('python', [
		'./../fingerPrint/example_enroll.py',
		req.query._id
	])

	// Takes stdout data from script which executed
	// with arguments and send this data to res object
	process.stdout.on('data', function(data) {
		res.send(data.toString())
	})
}

const fingerPrintSearch = (req, res) => {
	var process = spawn('python', './../fingerPrint/example_search.py')

	// Takes stdout data from script which executed
	// with arguments and send this data to res object
	process.stdout.on('data', function(data) {
		res.send(data.toString())
	})
}

module.exports = {
	randomAccountGenerator,
	fingerPrintEnroll,
	fingerPrintSearch
}
