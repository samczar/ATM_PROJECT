import React, { useState, useEffect } from 'react'

import Dashboard from './Dashboard'
import Login from './Login'

const App = () => {
	const [login, setLogin] = useState(false)
	const [name, setName] = useState('')
	const [accountNumber, setAccountNumber] = useState('')
	const [id, setId] = useState('')

	useEffect(() => {
		setAccountNumber(sessionStorage.getItem('account_number') || accountNumber)
		setName(sessionStorage.getItem('account_name') || name)
		setLogin(sessionStorage.getItem('login_state') || login)
		setId(sessionStorage.getItem('account_id') || id)
	})

	const handleAppLoad = () => {
		if (login !== false) {
			return <Dashboard />
		}
		if (login === false) {
			return <Login />
		}
	}

	return <div>{handleAppLoad()}</div>
}

export default App
