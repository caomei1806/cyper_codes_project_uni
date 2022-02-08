import './App.scss'
import Home from './shared/Home'
import Navbar from './shared/Navbar'
import Error from './shared/Error'
import Cezar from './components/Cezar'
import Polybius from './components/Polybius'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<>
					<Routes>
						<Route path='/' element={<Cezar />} />
						<Route path='/cezar' element={<Cezar />} />
						<Route path='/polybius' element={<Polybius />} />
						<Route path='*' element={<Error />} />
					</Routes>
				</>
			</div>
		</Router>
	)
}

export default App
