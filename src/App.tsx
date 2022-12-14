import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './auth/PrivateRoute';
import { Footer } from './components/Elements/Footer';
import { NavBar } from './components/Elements/NavBar';
import { AppEntry } from './pages/AppEntry';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Parameters } from './pages/Parameters';
import { Register } from './pages/Register';
import { Transactions } from './pages/Transactions';
import { UsersMain } from './pages/UsersMain';
import { Reports } from './pages/Report';

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
								<>
									<NavBar />
									<AppEntry />
									<Footer />
								</>
							</PrivateRoute>
						}
					/>
					<Route
						path='/users'
						element={
							<PrivateRoute>
								<>
									<NavBar />
									<UsersMain />
									<Footer />
								</>
							</PrivateRoute>
						}
					/>
					<Route
						path='/parameters'
						element={
							<PrivateRoute>
								<>
									<NavBar />
									<Parameters />
									<Footer />
								</>
							</PrivateRoute>
						}
					/>
					<Route
						path='/users'
						element={
							<PrivateRoute>
								<>
									<NavBar />
									<UsersMain />
									<Footer />
								</>
							</PrivateRoute>
						}
					/>
					<Route
						path='/transactions'
						element={
							<PrivateRoute>
								<>
									<NavBar />
									<Transactions />
									<Footer />
								</>
							</PrivateRoute>
						}
					/>
					<Route
						path='/reports'
						element={
							<PrivateRoute>
								<>
									<NavBar />
									<Reports />
									<Footer />
								</>
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
