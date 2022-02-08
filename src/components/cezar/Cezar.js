import React, { useState, useEffect } from 'react'
import ConsoleOutput from '../../shared/ConsoleOutput'

const Cezar = () => {
	const [textToEncrypt, setTextToEncrypt] = useState('')
	const [encryptionKey, setEncryptionKey] = useState('')
	const [encryptedWords, setEncryptedWords] = useState([])
	const [isDecrypted, setIsDecrypted] = useState(false)
	const [isTextError, setIsTextError] = useState(false)
	const [isKeyError, setIsKeyError] = useState(false)
	const [isModalShown, setIsModalShown] = useState(false)

	const handleEncryption = (textToEncrypt, encryptionKey, isDecrypted) => {
		const alphabet = [
			'a',
			'ą',
			'b',
			'c',
			'ć',
			'd',
			'e',
			'ę',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'ł',
			'm',
			'n',
			'ń',
			'o',
			'ó',
			'p',
			'q',
			'r',
			's',
			'ś',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
			'ź',
			'ż',
		]
		let encryptedWord = ''
		textToEncrypt.split('').forEach((letter) => {
			if (!isDecrypted) {
				const newIndex =
					parseInt(alphabet.indexOf(letter)) + parseInt(encryptionKey)
				if (newIndex < 32) {
					encryptedWord += alphabet[newIndex]
				} else {
					encryptedWord += alphabet[parseInt(newIndex) - 32]
				}
			} else {
				const newIndex =
					parseInt(alphabet.indexOf(letter)) - parseInt(encryptionKey)
				if (newIndex > 0) {
					encryptedWord += alphabet[newIndex]
				} else {
					encryptedWord += alphabet[parseInt(newIndex) + 32]
				}
			}
		})
		console.log(encryptedWord)
		return encryptedWord
	}

	// useEffect(() => {
	// 	const timeout = setTimeout(() => setIsModalShown(false), 3000)
	// 	return () => clearTimeout(timeout)
	// }, [isModalShown])

	const handleSubmit = (e) => {
		e.preventDefault()
		const filteredText = textToEncrypt
			.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/, '')
			.toLowerCase()
		// if (textToEncrypt.length !== filteredText.length) {
		// 	setIsModalShown(true)
		// }
		if (textToEncrypt === '') {
			setIsTextError(true)
		}
		if (!encryptionKey) {
			setIsKeyError(true)
		}
		if (filteredText.length === 0) {
			setIsTextError(true)
			setTextToEncrypt('')
			setEncryptionKey('')
		}

		if (filteredText && encryptionKey && isDecrypted) {
			const decryptedWord = {
				id: new Date().getTime().toString(),
				textToEncrypt,
				encryptionKey,
				encryptedText: handleEncryption(
					filteredText,
					encryptionKey,
					isDecrypted
				),
				isDecrypted,
			}
			setEncryptedWords((encryptedWords) => {
				return [...encryptedWords, decryptedWord]
			})
			setTextToEncrypt('')
			setEncryptionKey('')
			setIsTextError(false)
			setIsKeyError(false)
		} else if (filteredText && encryptionKey && !isDecrypted) {
			const encryptedWord = {
				id: new Date().getTime().toString(),
				textToEncrypt,
				encryptionKey,
				encryptedText: handleEncryption(
					filteredText,
					encryptionKey,
					isDecrypted
				),
				isDecrypted,
			}
			setEncryptedWords((encryptedWords) => {
				return [...encryptedWords, encryptedWord]
			})
			setTextToEncrypt('')
			setEncryptionKey('')
			setIsTextError(false)
			setIsKeyError(false)
		}
	}
	return (
		<>
			<div className='form-control'>
				<form onSubmit={handleSubmit} className='form'>
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
					<section className='input-section'>
						<label htmlFor='encryptionKey'>Encryption key within 1-34</label>
						<input
							type='number'
							className={isKeyError ? 'input error' : 'input'}
							id='encryptionKey'
							name='encryptionKey'
							value={encryptionKey}
							min='1'
							max='34'
							onChange={(e) => {
								setEncryptionKey(e.target.value)
								setIsKeyError(false)
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
				{isModalShown && (
					<p className='modal'>
						Unsupported characters for enctyption have been deleted.
					</p>
				)}
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
				</div>
			</div>
		</>
	)
}

export default Cezar
