import MainNavbar from "./components/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Welcome, Home } from "./pages/pagesIndex";
import './App.css';
import { DataNavigatorProvider } from "./components/DataNavigatorContext";

const App = () => {
	const savedUserLoginData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

	const PrivateRoute = ({ children }) => {
		return savedUserLoginData ? children : <Navigate to="/" />
	}

	const AppContent = () => {
		const location = useLocation();
		const showNavbar = location.pathname !== "/";
		const navigate = useNavigate()

		const onLogout = () => {
			localStorage.removeItem("user")
			navigate('/')
		}

		return (
			<div className="app">
				<DataNavigatorProvider>
					{showNavbar && <MainNavbar savedUserLoginData={savedUserLoginData} currentListName={"currentListName"} onLogout={onLogout} />}
					<Routes>
						<Route path='/' element={<Welcome />} />
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
