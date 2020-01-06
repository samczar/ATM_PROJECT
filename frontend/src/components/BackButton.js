import React from 'react'

import { Button } from './Button'
import { useHistory } from 'react-router-dom'

const BackButton = () => {
	const history = useHistory()
	const goBackWard = () => {
		history.push('/dashboard')
	}
	return <Button onClick={goBackWard}>Back</Button>
}

export default BackButton
