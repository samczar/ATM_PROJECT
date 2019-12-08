import React from 'react'
import { Route } from 'react-router-dom'

import App from './App'
import Deposit from './Deposit'
import Withdrawal from './Withdrawal'
import Enquire from './Enquire'
import Dashboard from './Dashboard'
import Login from './Login'
import CardMaker from './CardMaker'
import FaceMaker from './FaceMaker'

const AppRoute = () => {
	return (
		<div>
			<Route path="/" exact component={App} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/login" exact component={Login} />
			<Route path="/withdrawal" exact component={Withdrawal} />
			<Route path="/deposit" exact component={Deposit} />
			<Route path="/enquire" exact component={Enquire} />
			<Route path="/cardmaker" exact component={CardMaker} />
			<Route path="/facemaker" exact component={FaceMaker} />
		</div>
	)
}

export default AppRoute
