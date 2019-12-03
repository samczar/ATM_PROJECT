const express = require('express')
const router = express.Router()

const Card = require('../models/card')

router.get('/cards', (req, res, next) => {
	Card.find({ name: req.query.name }).then(cards => {
		res.send(cards)
	})
})

router.get('/card/:id', (req, res, next) => {
	Card.findById({ _id: req.params.id }).then(card => {
		res.send(card)
	})
})

router.get('/cardnumber/:card', (req, res, next) => {
	Card.findOne({ card_number: req.params.card }).then(data => {
		res.send({
			login: data.login,
			name: data.name,
			card_number: data.card_number,
			active: data.active
		})
		console.log(data)
	})
})

router.post('/card', (req, res, next) => {
	Card.create(req.body)
		.then(card => {
			res.send(card)
		})
		.catch(next) //passing the next gets the validation
})

router.put('/card/:id', (req, res, next) => {
	Card.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		useFindAndModify: false
	}).then(card => {
		res.send(card)
	})
})

router.delete('/card/:id', (req, res, next) => {
	Card.findByIdAndRemove({ _id: req.params.id }).then(card => {
		res.send(card)
	})
})

router.post('/card/:id/deposit', (req, res, next) => {
	const credit = req.query.deposit

	Card.findById({ _id: req.params.id }, (err, money) => {
		if (err) {
			res.send(err)
		} else {
			if (credit < 0) {
				money.credit = 0
			}
			Card.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						balance: parseInt(credit) + parseInt(money.balance),
						credit: credit
					}
				},
				function(err, doc) {
					if (err) {
						res.send(err)
					}
					res.send({
						err: '0',
						info: 'Money deposited',
						balance: parseInt(credit) + parseInt(money.balance)
					})
				}
			)
		}
	})
})

router.post('/card/:id/withdrawal', (req, res, next) => {
	const debit = req.query.debit

	Card.findById({ _id: req.params.id }, (err, money) => {
		if (err) {
			return err
		} else {
			if (money.balance < 0 || money.balance < debit) {
				res.send(err.message)
				return err.message
			} else {
				Card.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						$set: {
							debit: debit,
							balance: parseInt(money.balance) - parseInt(debit)
						}
					},
					(err, doc) => {
						if (err) {
							res.send(err)
						}
						res.send({
							err: '0',
							info: 'You just withdrew',
							balance: parseInt(money.balance) + parseInt(debit)
						})
					}
				)
			}
		}
	})
})

router.get('/card/:id/enquire', (req, res, next) => {
	Card.findById({ _id: req.params.id }, (err, data) => {
		res.send({
			err: '0',
			info: 'your balance is balance',
			balance: data.balance
		})
	})
})
router.post('/logout', (req, res, next) => {
	const cardNum = req.body.card_number

	Card.findOne({ card_number: cardNum }, (err, card) => {
		if (err) {
			res.send(err)
		} else {
			Card.findOneAndUpdate(
				{ card_number: card.card_number },
				{ $set: { login: false } },
				(err, doc) => {
					if (err) {
						res.send(err)
					} else {
						res.send({ err: 0, info: 'Logout was successful' })
					}
				}
			)
		}
	})
})
router.post('/login', (req, res) => {
	const cardNum = req.body.card_number
	const pin = req.body.pin

	Card.findOne({ card_number: cardNum }, (err, card) => {
		if (err) {
			res.send(err)
		} else {
			if (parseInt(pin) !== parseInt(card.pin) || card.pin === '') {
				res.send({ err: '-2', info: 'wrong' })
			} else {
				Card.findOneAndUpdate(
					{ card_number: cardNum },
					{ $set: { login: true } },
					(err, doc) => {
						if (err) {
							res.send(err)
						} else {
							res.send({
								err: 0,
								info: `welcome ${card.name}`,
								data: {
									name: card.name,
									card_number: card.card_number,
									login: card.login,
									_id: card._id
								}
							})
						}
					}
				)
			}
		}
	})
})

module.exports = router

// router.post('/logout', (req, res) => {
// 	res.send({ type: 'POST' })
// })
