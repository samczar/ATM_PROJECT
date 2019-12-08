import React from 'react'

import { Button } from './Button'

const FaceMaker = props => {
	const registerFace = () => {}
	return (
		<div>
			<Button>Snap User</Button>
			<div className="imageHolder"></div>
			<Button buttonStyle="btn--success--solid" type="button">
				Save
			</Button>
			<Button buttonStyle="btn--warning--solid">Cancel</Button>
		</div>
	)
}

export default FaceMaker
