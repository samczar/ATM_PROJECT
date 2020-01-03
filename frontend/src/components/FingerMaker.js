import React, { useState, useEffect } from 'react'

import { Button } from './Button'

import config from '../config'

const FingerMaker = props => {
	const [finger, setFinger] = useState('')
	const [id, setId] = useState('')

	useEffect(() => {
		setId(sessionStorage.getItem('account_id') || id)
	})
	const createFingerMaker = () => {
		fetch(`${config.api}/createFingerMakerApi`,{
			method: 'GET',
			headers: {
				 Accept: 'application/json',
				}
			})
			.then(data => {
				console.log(data.body)
				setFinger(data.body)
		
			})
		}

		const searchFingerMaker = () => {
		fetch(`${config.api}/searchFingerMakerApi`,{
			method: 'GET',
			headers: {
				 Accept: 'application/json',
				}
			})
			.then(data => {
				console.log(data.body)
				setFinger(data.body)
		
			})
		}

		const deleteFingerMaker = () => {
		fetch(`${config.api}/deleteFingerMakerApi`,{
			method: 'GET',
			headers: {
				 Accept: 'application/json',
				}
			})
			.then(data => {
				console.log(data.body)
				setFinger(data.body)
		
			})
		}	

	const handleSave = () => {
		fetch(`${config.api}/api/v1/card/${id}/register_fingerprint`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
			
		})
			// .then(resp => resp.ok ? resp.json())
			.then(data => {
				console.log(data)
				setFinger(data)
				// setMessage(data.info)
			})
			
	}

	return (
		<div>
			<Button onClick={createFingerMaker}>Scan Finger</Button>
			<div className="imageHolder"></div>
			<Button buttonStyle="btn--success--solid" type="button" onClick={handleSave}>
				Save
			</Button>
			<Button buttonStyle="btn--warning--solid" onClick={deleteFingerMaker}>Delete</Button>
		</div>
	)
}

export default FingerMaker
