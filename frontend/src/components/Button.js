import React from 'react'

const STYLES = [
	'btn--primary--solid',
	'btn--primary--outline',
	'btn--success--outline',
	'btn--success--solid',
	'btn--warning--outline',
	'btn--warning--solid'
]
const SIZES = ['btn--medium', 'btn--large']

export const Button = ({
	children,
	buttonStyle,
	buttonSize,
	type,
	onClick
}) => {
	const checkButtonStyle = STYLES.includes(buttonStyle)
		? buttonStyle
		: STYLES[0]

	const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

	return (
		<>
			<button
				onClick={onClick}
				type={type}
				className={`btn ${checkButtonStyle} ${checkButtonSize}`}
				value={children}
			>
				{children}
			</button>
		</>
	)
}
