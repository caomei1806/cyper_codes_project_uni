import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='navbar'>
			<h3>Cypercodes</h3>
			<ul>
				<Link to='/cezar'>cezar</Link>
				<li>cezar2</li>
				<li>cezar3</li>
				<li>cezar4</li>
				<li>cezar5</li>
			</ul>
		</div>
	)
}

export default Navbar
