import React, { useState, useEffect, useRef } from 'react'

import Login from './Login'
import config from '../config'
import { Button } from './Button'
import BackButton from './BackButton'

const Deposit = () => {
	const [login, setLogin] = useState(false)
	const [deposit, setDeposit] = useState(0)
	const [id, setId] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		setId(sessionStorage.getItem('account_id') || id)
		setLogin(sessionStorage.getItem('login_state') || login)
	})

	const inputHandlerRef = useRef(0)

	const depositHandler = () => {
		fetch(`${config.api}/api/v1/card/${id}/deposit?credit=${deposit}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ credit: parseInt(deposit) })
		})
			.then(resp => resp.json())
			.then(data => {
				setMessage(`Your deposit of ${deposit} was successful`)
				inputHandlerRef.current.value = '0'
			})
	}

	const depositLoad = () => {
		if (login === false) {
			return <Login />
		} else if (login !== false) {
			return (
				<div className="home">
					<input
						type="number"
						placeholder="Amount"
						onChange={e => setDeposit(e.target.value)}
						ref={inputHandlerRef}
						className="textInput"
					/>

					<Button onClick={depositHandler}>Deposit</Button>
					<BackButton />
					<br />
					{message}
				</div>
			)
		}
	}
	return <div>{depositLoad()}</div>
}

export default Deposit
