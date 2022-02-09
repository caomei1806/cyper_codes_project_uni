import React, { useState, useEffect } from 'react'
import ConsoleOutput from '../shared/ConsoleOutput'
import { alphabet, numbers } from '../shared/alphabet'

const Homofonic = () => {
	const [textToEncrypt, setTextToEncrypt] = useState('')
	const [encryptedWords, setEncryptedWords] = useState([])
	const [isDecrypted, setIsDecrypted] = useState(false)
	const [isTextError, setIsTextError] = useState(false)
	const [isModalShown, setIsModalShown] = useState(false)
	const [encryptionNumbers, setEncryptionNumbers] = useState([])

	const randomizeEncryptionNumbers = (letter) => {
		let encryptionNumbersSet = []
		let numbersSet = numbers
		let encryptionNumberAmount = Math.floor(Math.random() * 3 + 1)
		let letterNos = []
		for (let letterNo = 0; letterNo < encryptionNumberAmount; letterNo++) {
			let newEncryptionNumber = Math.floor(
				Math.random() * (numbersSet.length - 1) + 0
			)
			letterNos.push(numbersSet[newEncryptionNumber])
			numbersSet.pop(numbersSet[newEncryptionNumber])
			console.log(numbersSet[newEncryptionNumber])
		}
		encryptionNumbersSet[letter] = letterNos
		setEncryptionNumbers(encryptionNumbersSet)
		return encryptionNumbersSet
	}

	const drawEncryptionTable = () => {
		const encryptionTable = document.querySelector('.encryptionTable')
		const table = document.createElement('table')
		alphabet.map((letter, index) => {
			const tr = document.createElement('tr')
			const th = document.createElement('th')
			th.innerHTML = letter
			const td = document.createElement('td')
			td.innerHTML = randomizeEncryptionNumbers(index)
			tr.appendChild(th)
			tr.appendChild(td)
			table.appendChild(tr)
		})
		encryptionTable.appendChild(table)
	}

	useEffect(() => {
		drawEncryptionTable()
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<>
			<div className='content'>
				<div className='form-control'>
					<form onSubmit={handleSubmit} className='form'>
						<h2 className='cyperTitle'>Homofonic</h2>
						<section className='input-section'>
							<label htmlFor='textToEncrypt'>Text to encrypt</label>
							<input
								type='text'
								className={isTextError ? 'input error' : 'input'}
								id='textToEncrypt'
								name='textToEncrypt'
								value={textToEncrypt}
								onChange={(e) => {
									setTextToEncrypt(e.target.value)
									setIsTextError(false)
								}}
								autoComplete='off'
							/>
						</section>
						<section
							className='input-section'
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<input
								type='checkbox'
								name='isDecrypted'
								id='isDecrypted'
								value={isDecrypted}
								onChange={() => setIsDecrypted(!isDecrypted)}
							/>
							<label htmlFor='isDecrypted' style={{ marginLeft: '10px' }}>
								Decrypt
							</label>
						</section>
						<button type='submit' className='btn'>
							encrypt
						</button>
					</form>
				</div>
				<div className='console'>
					<div className='console-output'>
						<h4>Output:</h4>
						{encryptedWords.map((encryptedWord) => {
							return (
								<ConsoleOutput
									encryptedWord={encryptedWord}
									key={encryptedWord.id}
								/>
							)
						})}
						{isModalShown && (
							<p className='modal'>
								Unsupported characters for enctyption have been deleted.
							</p>
						)}
					</div>
				</div>
				<aside className='encryptionTable'></aside>
			</div>
		</>
	)
}

export default Homofonic
