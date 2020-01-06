import React, { useState, useEffect, useRef } from 'react'

import Login from './Login'
import config from '../config'
import { Button } from './Button'
import BackButton from './BackButton'

const Withdrawal = () => {
	const [login, setLogin] = useState(false)
	const [debit, setDebit] = useState(0)
	const [id, setId] = useState('')
	const [finger, setFinger] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		setId(sessionStorage.getItem('account_id') || id)
		setLogin(sessionStorage.getItem('login_state') || login)
	})

	const inputHandlerRef = useRef(0)

	const debitHandler = () => {
		if (debit === '' || debit === 0) {
			setMessage('Amount can not be 0 or empty')
		}
		fetch(`${config.api}/searchFingerMakerApi`)
			.then(resp => resp.json())
			.then(data => {
				setFinger(data.info)
			})

		if (finger === ' ' || finger === null) {
			setMessage('Finger Print is null')
		} else {
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
	}

	const debitLoad = () => {
		if (login === false) {
			return <Login />
		} else if (login !== false) {
			return (
				<div className="home">
					<div className="template">
						<input
							type="number"
							placeholder="Amount"
							onChange={e => setDebit(e.target.value)}
							ref={inputHandlerRef}
							className="textInput"
						/>

						<Button onClick={debitHandler}>withdraw</Button>
						<BackButton />
						<br />
						{message}
					</div>
				</div>
			)
		}
	}
	return <div>{debitLoad()}</div>
}
export default Withdrawal
