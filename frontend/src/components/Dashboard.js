import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Login from './Login'
import config from '../config'

const Dashboard = () => {
	const [name, setName] = useState('')
	const [login, setLogin] = useState(false)
	const [accountNumber, setAcountNumber] = useState('')

	useEffect(() => {
		setName(sessionStorage.getItem('name') || name)
		setLogin(sessionStorage.getItem('login_state') || login)
		setAcountNumber(sessionStorage.getItem('account_number') || accountNumber)
	})

	const Logout = () => {
		fetch(`${config.api}/api/v1/logout`).then(sessionStorage.clear())
	}

	const dashboardLoad = () => {
		if (login === false) {
			return <Login />
		} else if (login !== false) {
			return (
				<div>
					<h3>
						{name} & card Number {accountNumber}
					</h3>
					<br />
					<Link to="/deposit">Deposit</Link>
					<br />
					<Link to="/withdrawal">Withdrawal</Link>
					<br />
					<Link to="/enquire">Balance</Link>
					<br />
					<Link to="/" onClick={Logout}>
						Logout
					</Link>
				</div>
			)
		}
	}

	return <>{dashboardLoad()}</>
}

export default Dashboard
