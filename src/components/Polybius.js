import { useState, useEffect } from 'react'
import { alphabet } from '../shared/alphabet'
import ConsoleOutput from '../shared/ConsoleOutput'

const Polybius = () => {
	const [textToEncrypt, setTextToEncrypt] = useState('')
	const [encryptionKey, setEncryptionKey] = useState('')
	const [encryptedWords, setEncryptedWords] = useState([])
	const [isDecrypted, setIsDecrypted] = useState(false)
	const [isTextError, setIsTextError] = useState(false)
	const [isKeyError, setIsKeyError] = useState(false)
	const [isCheckboard, setIsCheckboard] = useState(true)
	const [isModalFilterShown, setIsModalFilterShown] = useState(false)

	// DRAWING ALPHABET CHECKBOARD
	const drawCheckboard = () => {
		const ckeckboardContainer = document.querySelector('.checkboard')
		ckeckboardContainer.innerHTML = ''
		const table = document.createElement('table')
		const tr = document.createElement('tr')
		const rowLength = parseInt(encryptionKey)
		let thEmpty = document.createElement('th')
		tr.appendChild(thEmpty)

		for (let header = 1; header <= rowLength; header++) {
			let th = document.createElement('th')
			th.innerHTML = header
			tr.appendChild(th)
		}
		table.appendChild(tr)
		ckeckboardContainer.appendChild(table)

		let currentLetter = 0
		const checkboardOverflow = alphabet.length % rowLength !== 0 ? 1 : 0
		for (
			let row = 1;
			row <= alphabet.length / rowLength + checkboardOverflow;
			row++
		) {
			let tr = document.createElement('tr')
			let thCount = document.createElement('th')
			thCount.innerHTML = row
			tr.appendChild(thCount)
			for (let rowItem = 1; rowItem <= rowLength; rowItem++) {
				let td = document.createElement('td')
				if (alphabet[currentLetter] !== undefined) {
					td.innerHTML = alphabet[currentLetter]
					tr.appendChild(td)
				} else {
					td.innerHTML = ''
					tr.appendChild(td)
				}
				currentLetter++
			}
			table.appendChild(tr)
		}
	}
	// DRAWING ALPHABET CHECKBOARD END~

	const handleEncryption = (textToEncrypt, encryptionKey, isDecrypted) => {
		let encryptedWord = ''
		if (!isDecrypted) {
			textToEncrypt.split('').forEach((letter) => {
				encryptedWord += `${
					(alphabet.indexOf(letter) + 1) % encryptionKey === 0
						? encryptionKey
						: (alphabet.indexOf(letter) + 1) % encryptionKey
				}${Math.ceil((alphabet.indexOf(letter) + 1) / encryptionKey)} `
			})
		} else {
			textToEncrypt.split(' ').forEach((encryptedFragment) => {
				if (
					encryptedFragment[1] <= Math.ceil(alphabet.length / encryptionKey)
				) {
					const letter =
						alphabet[
							(parseInt(encryptedFragment[1]) - 1) * encryptionKey +
								parseInt(encryptedFragment[0]) -
								1
						]
					if (letter !== undefined) encryptedWord += letter
				}
			})
		}
		return encryptedWord
	}

	useEffect(() => {
		const timeout = setTimeout(() => setIsModalFilterShown(false), 3000)
		return () => clearTimeout(timeout)
	}, [isModalFilterShown])

	const handleSubmit = (e) => {
		e.preventDefault()
		// EMPTY INPUTS
		if (textToEncrypt === '') {
			setIsTextError(true)
		}
		if (!encryptionKey) {
			setIsKeyError(true)
		}
		//
		let filteredText = ''
		if (!isDecrypted) {
			filteredText = textToEncrypt
				.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/, '')
				.toLowerCase()
		} else {
			const ex = `[^1-${encryptionKey}]`
			const regex = new RegExp(ex, 'g')
			filteredText = textToEncrypt.replace(regex, '')
			if (filteredText.length % 2 !== 0) {
				setIsTextError(true)
			} else {
				let filteredTextWithSpaces = [...filteredText]
					.map((d, i) => (i % 2 == 0 ? ' ' + d : d))
					.join('')
					.trim()
				filteredText = filteredTextWithSpaces
			}
		}
		// EMPTY AFTER FILTERING
		if (filteredText.length === 0) {
			setIsTextError(true)
			setTextToEncrypt('')
			setEncryptionKey('')
		}
		if (isDecrypted && filteredText.replace(' ', '').length % 2 !== 0) {
			setIsTextError(true)
			setTextToEncrypt('')
			setEncryptionKey('')
		}

		if (!isTextError && !isKeyError && filteredText.length > 0) {
			drawCheckboard()
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
				filteredText,
			}
			setEncryptedWords((encryptedWords) => {
				return [...encryptedWords, encryptedWord]
			})

			setTextToEncrypt('')
			setEncryptionKey('')
		}
		if (
			textToEncrypt.length !== filteredText.length &&
			filteredText.length % 2 === 0 &&
			filteredText.length !== 0
		) {
			setIsModalFilterShown(true)
		}
	}
	return (
		<>
			<div className='content'>
				<div>
					<div className='form-control'>
						<form onSubmit={handleSubmit} className='form'>
							<h2 className='cyperTitle'>Polybius square</h2>
							<section className='input-section'>
								<label htmlFor='textToEncrypt'>Text to encrypt </label>
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
								<label htmlFor='encryptionKey'>
									Letters per row in the checkerboard [5-10]
								</label>
								<input
									type='number'
									className={isKeyError ? 'input error' : 'input'}
									id='encryptionKey'
									name='encryptionKey'
									value={encryptionKey}
									min='5'
									max='10'
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
					</div>
					{isCheckboard && <aside className='checkboard'></aside>}
				</div>

				<div className='console'>
					<section className='console-output'>
						<h4>Output:</h4>

						{encryptedWords.map((encryptedWord) => {
							return (
								<ConsoleOutput
									encryptedWord={encryptedWord}
									key={encryptedWord.id}
								/>
							)
						})}
						{isModalFilterShown && (
							<p className='modal'>
								Unsupported characters for enctyption have been deleted.
							</p>
						)}
					</section>
				</div>
			</div>
		</>
	)
}

export default Polybius
