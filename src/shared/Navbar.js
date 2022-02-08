import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
	const { pathname } = useLocation()
	const currentSite = pathname.split('/')
	return (
		<div className='navbar'>
			<h3>Cypercodes</h3>
			<ul>
				<Link
					to='/cezar'
					className={currentSite[1] === 'cezar' ? 'active link' : 'link'}
				>
					caesar
				</Link>
				<Link
					to='/polybius'
					className={currentSite[1] === 'polybius' ? 'active link' : 'link'}
				>
					Polybius square
				</Link>
				<li>cezar3</li>
				<li>cezar4</li>
				<li>cezar5</li>
			</ul>
		</div>
	)
}

export default Navbar
