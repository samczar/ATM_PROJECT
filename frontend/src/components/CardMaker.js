import React, { useState, useRef } from 'react'

import FaceMaker from './FaceMaker'
import config from '../config'
import { Button } from './Button'

const CardMaker = () => {

	const [cardName, setCardName] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [fingerPrint, setFingerPrint]  = useState()
	const [cardPin, setCardPin] = useState(0)
	const [message, setMessage] = useState('')

	const refName = useRef('')
	const refAccountNumber = useRef('')
	const refPin = useRef(0)

	const createFingerMaker = () => {
	fetch(`${config.api}/createFingerMakerApi`,{
		method: 'GET',
		headers: {
			 Accept: 'application/json',
			}
		})
		.then(data => {
			console.log(data.body)
			setFingerPrint(data.body)
	
		})
	}

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
		
			<Button onClick={createFingerMaker}>Scan Finger</Button>
			<br />
			<Button buttonStyle="btn--success--solid" 
			type="button" onClick={handleSave}>
				Save
			</Button>
			<br />
			<button onClick={createCard}>Create User</button>
			<br />
			{message}
		</div>
	)
}

export default CardMaker
