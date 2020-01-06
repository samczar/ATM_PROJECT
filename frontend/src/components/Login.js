import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import config from '../config'
import { Button } from './Button'

const Login = () => {
	const [accountNumber, setAccountNumber] = useState('')
	const [pin, setPin] = useState('')
	const [login, setLogin] = useState(false)
	const [finger, setFinger] = useState('')
	const [imageName, setImageName] = useState('')

	const accountNumberRef = useRef(null)
	const pinRef = useRef(null)
	const history = useHistory()

	const handleScanFinger = () => {
		fetch(`${config.api}/searchFingerMakerApi`)
		.then(resp=> resp.json())
		.then(data =>{
			setFinger(data.info)
		})
	}
	const handleCaptureImage = () =>{
		
    }
	const handleLogin = () => {
		if (finger.length === 0 || pin.length === 0) {
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

				setLogin(true)

				history.push('/dashboard')
			})
	}

	return (
		<>
			{/* <input
				type="text"
				placeholder="Account Number"
				onChange={e => setAccountNumber(e.target.value)}
				ref={accountNumberRef}
			/> */}
			<Button  buttonStyle="btn--success--solid" type="button"
			 onClick={handleScanFinger}>Scan finger</Button>
			<br />
			<Button buttonStyle="btn--warning--solid" type="button"
			 onClick={handleCaptureImage}>Capture image</Button>
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
