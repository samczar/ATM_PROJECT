import React, { useState, useEffect, useRef } from 'react'

import Keypad from './Keypad'
import Login from './Login'
import config from '../config'

const Withdrawal = () => {
	const [login, setLogin] = useState(false)
	const [debit, setDebit] = useState(0)
	const [id, setId] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		setId(sessionStorage.getItem('account_id') || id)
		setLogin(sessionStorage.getItem('login_state') || login)
	})

	const inputHandlerRef = useRef(0)

	const debitHandler = () => {
		fetch(`${config.api}/api/v1/card/${id}/withdrawal?debit=${debit}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ debit: parseInt(debit) })
		})
			.then(resp => resp.json())
			.then(data => {
				setMessage(`Your withdrawal of ${debit} was successful`)
				inputHandlerRef.current.value = '0'
			})
	}

	const debitLoad = () => {
		if (login === false) {
			return <Login />
		} else if (login !== false) {
			return (
				<>
					<input
						type="number"
						placeholder="Amount"
						onChange={e => setDebit(e.target.value)}
						ref={inputHandlerRef}
					/>

					<button onClick={debitHandler}>Debit</button>
					<br />
					{message}

					<Keypad />
				</>
			)
		}
	}
	return <div>{debitLoad()}</div>
}
export default Withdrawal