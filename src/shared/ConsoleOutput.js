import React from 'react'

const ConsoleOutput = ({ encryptedWord }) => {
	return (
		<>
			{!encryptedWord.id || (
				<div className='console-output-single'>
					<p>Text input: {encryptedWord.textToEncrypt}</p>
					<p>Encryption key: {encryptedWord.encryptionKey}</p>
					<p>
						Action: {encryptedWord.isDecrypted ? 'decryption' : 'encryption'}
					</p>
					<h4>
						{encryptedWord.isDecrypted
							? 'Decrypted word: '
							: 'Encrypted word: '}
						{encryptedWord.encryptedText}
					</h4>
				</div>
			)}
		</>
	)
}

export default ConsoleOutput
