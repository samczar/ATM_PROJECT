const PiCamera = require('pi-camera')
const myCamera = new PiCamera({
	mode: 'photo',
	output: `${__dirname}/public/images/user${Date.now()}.jpg`,
	width: 640,
	height: 480,
	nopreview: true
})

myCamera
	.snap()
	.then(result => {
		// Your picture was captured
		console.log('snap')
	})
	.catch(error => {
		// Handle your error
	})
module.exports = myCamera

const randomAccountGenerator = () => {
	let now = Date.now().toString() // '1492341545873'
	// pad with extra random digit
	now += now + Math.floor(Math.random() * 10)
	// format
	return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
}

module.exports = randomAccountGenerator
