import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import Login from './Login'
import config from '../config'
import { Button } from './Button'

const Dashboard = () => {
	const [name, setName] = useState('')
	const [login, setLogin] = useState(false)
	const [accountNumber, setAcountNumber] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		setName(sessionStorage.getItem('name') || name)
		setLogin(sessionStorage.getItem('login_state') || login)
		setAcountNumber(sessionStorage.getItem('account_number') || accountNumber)
	})

	const Logout = () => {
		fetch(`${config.api}/api/v1/logout`).then(sessionStorage.clear())
	}

	const handleCardDeactivation = () => {
		setMessage('Card Has Being Deactivated')
	}

	const confirm = () => {
		confirmAlert({
			title: 'Deactivate Card?',
			message: 'Are you sure to do this.',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						alert('Click Yes')
						setMessage('Card Has Being Deactivated')
					}
				},
				{
					label: 'No',
					onClick: () => alert('Click No')
				}
			]
		})
	}
	const dashboardLoad = () => {
		if (login === false) {
			return <Login />
		} else if (login !== false) {
			return (
				<div className="home">
					<div className="template">
						<h3>
							{name} & card Number {accountNumber}
						</h3>
						<br />
						<Button>
							<Link to="/deposit">Deposit</Link>
						</Button>
						<Button>
							<Link to="/withdrawal">Withdrawal</Link>
						</Button>
						<br />
						<Button>
							<Link to="/enquire">Balance</Link>
						</Button>
						<div className="container">
							<button onClick={confirm}>Confirm dialog</button>
						</div>
						<br />
						<div>{message}</div>
						<br />
						<Button>
							<Link to="/" onClick={Logout}>
								Logout
							</Link>
						</Button>
					</div>
				</div>
			)
		}
	}

	return <>{dashboardLoad()}</>
}

export default Dashboard
