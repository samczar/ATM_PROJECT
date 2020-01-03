const mongoose = require('mongoose')

Schema = mongoose.Schema

//Create Card Schema & Model
const cardSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
		trim: true
	},
	card_number: {
		type: String,
		unique: [true, 'Card Number must be unique'],
		required: true,
		trim: true
	},
	pin: { type: Number, trim: true, minlength: [4, 'Pin is Only 4 digit'] },
	face: { type: String },
	finger: { type: Number, trim: true },
	active: {
		type: Boolean,
		default: true
	},
	credit: {
		type: Number,
		default: 0
	},
	debit: {
		type: Number,
		default: 0
	},
	balance: {
		type: Number,
		default: 0
	},
	login: {
		type: Boolean,
		default: false
	},
	created_at: { type: { Date }, default: Date.now() },
	updated_at: { type: { Date }, default: Date.now() }
})

//Mongoose Pluralizes the collection name
const Card = mongoose.model('card', cardSchema)

module.exports = Card
