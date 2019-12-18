import React, { useState, useRef } from 'react'

import FaceMaker from './FaceMaker'
import FingerMaker from './FingerMaker'
import config from '../config'

const CardMaker = () => {
	// const [login, setLogin] = useState(false)
	const [cardName, setCardName] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [cardPin, setCardPin] = useState(0)
	const [message, setMessage] = useState('')

	const refName = useRef('')
	const refAccountNumber = useRef('')
	const refPin = useRef(0)

	const createCard = () => {
		fetch(`${config.api}/api/v1/card`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: cardName,
				card_number: cardNumber,
				pin: parseInt(cardPin)
			})
		})
			.then(resp => resp.json())
			.then(data => {
				refName.current.value = null
				refAccountNumber.current.value = null
				refPin.current.value = '0'

				setMessage(`${data.info} ${data.name}`)
			})
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Card Name"
				onChange={e => {
					setCardName(e.target.value)
				}}
				ref={refName}
			/>
			<br />
			<input
				type="text"
				placeholder="Card Number"
				onChange={e => {
					setCardNumber(e.target.value)
				}}
				ref={refAccountNumber}
			/>
			<br />
			<input
				type="number"
				placeholder="Pin"
				max="4"
				onChange={e => {
					setCardPin(e.target.value)
				}}
				ref={refPin}
			/>

			<br />
			<button onClick={createCard}>Create Card</button>
			<br />
			{message}
		</div>
	)
}

export default CardMaker
