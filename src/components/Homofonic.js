import React, { useState, useEffect } from 'react'
import ConsoleOutput from '../shared/ConsoleOutput'
import { alphabet, numbers } from '../shared/alphabet'

const Homofonic = () => {
	const [textToEncrypt, setTextToEncrypt] = useState('')
	const [encryptedWords, setEncryptedWords] = useState([])
	const [isDecrypted, setIsDecrypted] = useState(false)
	const [isTextError, setIsTextError] = useState(false)
	const [isModalShown, setIsModalShown] = useState(false)
	const [no, setNo] = useState([])

	let numbersSet = [...numbers]
	let encryptionNumbersSet = []

	const randomizeEncryptionNumbers = (letter) => {
		let encryptionNumberAmount = Math.floor(Math.random() * 3 + 1)
		let letterNos = []
		for (let letterNo = 0; letterNo < encryptionNumberAmount; letterNo++) {
			const max = numbersSet.length
			let newEncryptionNumber = Math.floor(Math.random() * max)
			letterNos.push(numbersSet[newEncryptionNumber])
			const a = numbersSet.filter(
				(no) => no !== numbersSet[newEncryptionNumber]
			)
			numbersSet = a
		}

		return letterNos
	}

	const drawEncryptionTable = () => {
		const encryptionTable = document.querySelector('.encryptionTable')
		const table = document.createElement('table')
		alphabet.map((letter, index) => {
			const tr = document.createElement('tr')
			const th = document.createElement('th')
			th.innerHTML = letter
			const td = document.createElement('td')
			const noSet = randomizeEncryptionNumbers()
			encryptionNumbersSet.push(noSet)

			td.innerHTML = noSet
			tr.appendChild(th)
			tr.appendChild(td)
			table.appendChild(tr)
		})
		setNo(encryptionNumbersSet)
		encryptionTable.appendChild(table)
	}

	useEffect(() => {
		drawEncryptionTable()
	}, [])

	const handleEncryption = (textForEncryption) => {
		let encryptedWord = ''
		if (!isDecrypted) {
			textForEncryption.split('').forEach((letter) => {
				const letterIndex = alphabet.indexOf(letter)
				let noPosition = Math.floor(Math.random() * no[letterIndex].length + 0)
				if (no[letterIndex].length !== 0)
					encryptedWord += no[letterIndex][noPosition] + ','
				else encryptedWord += no[letterIndex] + ','
			})
			encryptedWord = encryptedWord.slice(0, -1).replace(/,/g, ' ')
		} else {
			textForEncryption.split(',').forEach((number) => {
				let letter = ''
				no.map((noSet, index) => {
					//console.log(noSet, index)
					noSet.map((noSetSingle) => {
						if (parseInt(number) === noSetSingle) {
							letter = alphabet[index]
						}
					})
				})

				encryptedWord += letter
			})
		}
		return encryptedWord
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (textToEncrypt === '') {
			setIsTextError(true)
		}
		let filteredText = ''
		if (!isDecrypted) {
			filteredText = textToEncrypt
				.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/, '')
				.toLowerCase()
		} else {
			const ex = `[^0-9]`
			const regex = new RegExp(ex, 'g')
			filteredText = textToEncrypt.replace(regex, '')
			if (filteredText.length % 3 !== 0) {
				setIsTextError(true)
			} else {
				filteredText = filteredText.match(/.{1,3}/g).join(',')
			}
		}
		if (!isTextError) {
			if ((isDecrypted && filteredText.length % 3 === 0) || !isDecrypted) {
				const encryptedWord = {
					id: new Date().getTime().toString(),
					textToEncrypt,
					encryptedText: handleEncryption(filteredText),
					isDecrypted,
					filteredText,
				}
				setEncryptedWords((encryptedWords) => {
					return [...encryptedWords, encryptedWord]
				})

				setTextToEncrypt('')
			}
		}
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
