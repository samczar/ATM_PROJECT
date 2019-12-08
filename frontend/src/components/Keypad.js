import React, { useState } from 'react'

import { Button } from './Button'
import './button.css'

const Keypad = key => {
	const [data, setData] = useState([])

	const getValue = e => {
		setData([data, e.target.value])
	}

	return (
		<div>
			<Button onClick={getValue} type="button">
				1
			</Button>
			<Button onClick={getValue} type="button">
				2
			</Button>
			<Button onClick={getValue} type="button">
				3
			</Button>
			<Button onClick={getValue} type="button">
				4
			</Button>
			<Button onClick={getValue} type="button">
				5
			</Button>
			<Button onClick={getValue} type="button">
				6
			</Button>
			<Button onClick={getValue} type="button">
				7
			</Button>
			<Button onClick={getValue} type="button">
				9
			</Button>
			<Button onClick={getValue} type="button">
				0
			</Button>
			<Button onClick={getValue} type="button">
				Back
			</Button>
			<Button onClick={getValue} type="button">
				Clear
			</Button>
			<Button onClick={getValue} type="button">
				Enter
			</Button>
			<Button onClick={getValue} type="button">
				Cancel
			</Button>

			{data}
		</div>
	)
}

export default Keypad
