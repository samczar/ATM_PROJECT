import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import config from '../config'
import { Button } from './Button'
import Keypad from './Keypad'

const Login = () => {
	const [pin, setPin] = useState('')
	const [login, setLogin] = useState(false)
	const [finger, setFinger] = useState('')
	const [message, setMessage] = useState('')

	const pinRef = useRef(null)
	const history = useHistory()

	const handleScanFinger = () => {
		fetch(`${config.api}/searchFingerMakerApi`)
			.then(resp => resp.json())
			.then(data => {
				setFinger(data.info)
			})
	}

	const handleLogin = () => {
		if (finger.length === 0 || finger === 'undefined') {
			setMessage('finger print cannot be empty')
			return
		}
		if (pin.length < 4 || pin === '') {
			setMessage('pin cannot be empty')
			return
		}
		fetch(`${config.api}/api/v1/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				finger: parseInt(finger),
				pin: parseInt(pin)
			})
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data)
				const account_name = data.data.name
				const account_number = data.data.card_number
				const account_id = data.data._id

				sessionStorage.setItem('name', account_name)
				sessionStorage.setItem('account_number', account_number)
				sessionStorage.setItem('account_id', account_id)
				sessionStorage.setItem('login_state', true)
				sessionStorage.setItem('finger_encrypted', finger)

				setLogin(true)

				history.push('/dashboard')
			})
	}

	return (
		<div className="home">
			<div className="template">
				<Button
					buttonStyle="btn--success--solid"
					type="button"
					onClick={handleScanFinger}
				>
					Scan finger
				</Button>
				<br />
				<input
					type="password"
					placeholder="Pin"
					onChange={e => setPin(e.target.value)}
					ref={pinRef}
					className="textInput"
				/>
				<br />
				<Button onClick={handleLogin}>Enter</Button>
				{message}
			</div>
		</div>
	)
}

export default Login
