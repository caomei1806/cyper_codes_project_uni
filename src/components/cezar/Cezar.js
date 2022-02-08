import React, { useState } from 'react'
import ConsoleOutput from '../../shared/ConsoleOutput'

const Cezar = () => {
	const [textToEncrypt, setTextToEncrypt] = useState('')
	const [encryptionKey, setEncryptionKey] = useState('')
	const [encryptedWords, setEncryptedWords] = useState([])
	const [isDecrypted, setIsDecrypted] = useState(false)

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
		console.log(textToEncrypt.replace(/[^[a-z]]/, ''))
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

	const handleSubmit = (e) => {
		e.preventDefault()
		const filteredText = textToEncrypt
			.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/, '')
			.toLowerCase()
		if (textToEncrypt && encryptionKey && isDecrypted) {
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
		}
		if (textToEncrypt && encryptionKey && !isDecrypted) {
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
							className='input'
							id='textToEncrypt'
							name='textToEncrypt'
							value={textToEncrypt}
							onChange={(e) => {
								setTextToEncrypt(e.target.value)
							}}
							autocomplete='off'
						/>
					</section>
					<section className='input-section'>
						<label htmlFor='encryptionKey'>Encryption key within 1-34</label>
						<input
							type='text'
							className='input'
							id='encryptionKey'
							name='encryptionKey'
							value={encryptionKey}
							onChange={(e) => {
								setEncryptionKey(e.target.value)
							}}
							autocomplete='off'
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
				</div>
			</div>
		</>
	)
}

export default Cezar
