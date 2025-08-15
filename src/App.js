import MainNavbar from "./components/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Welcome, Home } from "./pages/pagesIndex";
import './App.css';
import { DataNavigatorProvider } from "./components/DataNavigatorContext";
import { useEffect, useState } from "react";

const App = () => {
	const [savedUserLoginData, setSavedUserLoginData] = useState(null)

	useEffect(() => {
		const user = localStorage.getItem("user")
		if (!user) return

		setSavedUserLoginData(JSON.parse(user))
	}, [setSavedUserLoginData])

	console.log(savedUserLoginData)

	const PrivateRoute = ({ children }) => {
		return savedUserLoginData ? children : <Navigate to="/" />
	}

	const AppContent = () => {
		const location = useLocation();
		const showNavbar = location.pathname !== "/";
		const navigate = useNavigate()

		const onLogout = () => {
			localStorage.removeItem("user")
			setSavedUserLoginData(null)
			navigate('/')
		}

		return (
			<div className="app">
				<DataNavigatorProvider>
					{showNavbar && <MainNavbar savedUserLoginData={savedUserLoginData} currentListName={"currentListName"} onLogout={onLogout} />}
					<Routes>
						<Route path='/' element={savedUserLoginData ? <Navigate to="/home" /> : <Welcome setSavedUserLoginData={setSavedUserLoginData} />} />
						<Route path='/home' element={<PrivateRoute><Home savedUserLoginData={savedUserLoginData} /></PrivateRoute>} />
						<Route path="*" element={<h1>404 Not Found</h1>} />
					</Routes>
				</DataNavigatorProvider>
			</div>
		);
	};

	return (
		<Router>
			<AppContent />
		</Router>
	);
};

export default App;
