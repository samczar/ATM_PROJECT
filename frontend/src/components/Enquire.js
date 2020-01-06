import React, { useState, useEffect } from 'react'

import Login from './Login'
import config from '../config'
import BackButton from './BackButton'

const Enquire = () => {
	const [login, setLogin] = useState(false)
	const [id, setId] = useState('')
	const [balance, setBalance] = useState(0)
	const [message, setMessage] = useState('')

	useEffect(() => {
		setLogin(sessionStorage.getItem('login_state') || login)
		setId(sessionStorage.getItem('account_id') || id)

		fetch(`${config.api}/api/v1/card/${id}/enquire`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(resp => resp.json())
			.then(data => {
				setBalance(data.balance)
				setMessage(data.info)
			})
	})

	const enquireLoad = () => {
		if (login === false) {
			return <Login />
		} else if (login !== false) {
			return (
				<div className="home">
					<div className="template">
						<p>
							<b>
								{message}
								{balance}
							</b>
						</p>
						<br />
						<br />
						<BackButton />
					</div>
				</div>
			)
		}
	}

	return <>{enquireLoad()}</>
}
export default Enquire
