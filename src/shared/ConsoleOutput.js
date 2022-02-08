import React from 'react'

const ConsoleOutput = ({ encryptedWord }) => {
	return (
		<>
			{!encryptedWord.encryptedText || (
				<article className='console-output-single'>
					<p>Text input: {encryptedWord.textToEncrypt}</p>
					<p>Final filtered text: {encryptedWord.filteredText}</p>
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
				</article>
			)}
		</>
	)
}

export default ConsoleOutput
