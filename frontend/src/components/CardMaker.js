import React, { useState, useRef } from 'react'

import config from '../config'
import { Button } from './Button'

const CardMaker = () => {
	const [cardName, setCardName] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [fingerPrint, setFingerPrint] = useState('')
	const [cardPin, setCardPin] = useState(0)
	const [message, setMessage] = useState('')

	const refName = useRef('')
	const refAccountNumber = useRef('')
	const refPin = useRef(0)

	const createFingerMaker = async () => {
		var response = await fetch(`${config.api}/createFingerMakerApi`)
		const data = await response.json()
		setFingerPrint(data.info)
		setMessage('Finger print gotten' ,data.info)
		if (data.info === 'undefined' || data.info === null || data.info === ''){
		setMessage('Finger print not correct yet')
}
	}

	const createCard = () => {

     if(cardName === '' || cardName.length < 2){
		setMessage('Card name can not be empty or less than 2')
	return
	}
 	if(cardNumber === '' || cardNumber < 2){
		setMessage('Card Number can not be empty or less than 2')
		return
}
	if(cardPin === '' || cardPin.length < 4){
		setMessage('Pin can not be empty or less than 4')
		return
	}
	if(fingerPrint === '' || fingerPrint === 'undefined'){
		setMessage('Finger Print can not be empty ')
		return
	}
		fetch(`${config.api}/api/v1/card`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: cardName,
				card_number: cardNumber,
				pin: parseInt(cardPin),
				finger: parseInt(fingerPrint)
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
		<div className="home">
			<div className="template">
				<input
					type="text"
					placeholder="Card Name"
					onChange={e => {
						setCardName(e.target.value)
					}}
					ref={refName}
					className="textInput"
				/>
				
				<br />
				<input
					type="text"
					placeholder="Card Number"
					onChange={e => {
						setCardNumber(e.target.value)
					}}
					ref={refAccountNumber}
					className="textInput"
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
					className="textInput"
				/>
				<br />
			
				<Button onClick={createFingerMaker}>Scan Finger</Button>
				<br />
				
				<Button onClick={createCard}>Create User</Button>

				<br />
				{message}
			</div>
		</div>
	)
}

export default CardMaker
