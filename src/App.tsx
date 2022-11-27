import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './auth/PrivateRoute';
import { AppEntry } from './pages/AppEntry';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/app'
						element={
							<PrivateRoute>
								<AppEntry />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
