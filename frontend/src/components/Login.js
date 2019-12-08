import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import config from '../config'

const Login = () => {
	const [accountNumber, setAccountNumber] = useState('')
	const [pin, setPin] = useState('')
	const [login, setLogin] = useState(false)

	const accountNumberRef = useRef(null)
	const pinRef = useRef(null)
	const history = useHistory()
	const handleLogin = () => {
		if (accountNumber.length === 0 || pin.length === 0) {
			return
		}
		fetch(`${config.api}/api/v1/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				card_number: accountNumber,
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

				setLogin(true)

				history.push('/dashboard')
			})
	}

	return (
		<>
			<input
				type="text"
				placeholder="Account Number"
				onChange={e => setAccountNumber(e.target.value)}
				ref={accountNumberRef}
			/>
			<br />
			<input
				type="password"
				placeholder="Pin"
				onChange={e => setPin(e.target.value)}
				ref={pinRef}
			/>
			<br />
			<button onClick={handleLogin}>Enter</button>
			<button>Cancel</button>
		</>
	)
}

export default Login
