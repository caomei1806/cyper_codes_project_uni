import './App.scss'
import Home from './shared/Home'
import Navbar from './shared/Navbar'
import Error from './shared/Error'
import Cezar from './components/cezar/Cezar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cezar' element={<Cezar />} />
						<Route path='*' element={<Error />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
