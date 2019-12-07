module.exports = {
	port: process.env.port,
	mongo_url: process.env.MONGO_URI || 'mongodb://localhost:27017/atm_project'
}
