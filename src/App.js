import MainNavbar from "./components/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Test, Welcome, Home } from "./pages/pagesIndex";
import './App.css';

const AppLayout = () => {
	const savedUserLoginData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const location = useLocation();

    console.log(savedUserLoginData)

    // Check if we are NOT on the welcome page
    const showNavbar = !savedUserLoginData && location.pathname !== "/";

    const PrivateRoute = ({ children }) => {
        return savedUserLoginData ? children : <Navigate to="/"/>
    }

	return (
        <>
            {showNavbar && <MainNavbar />}
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/home' element={<PrivateRoute><Home savedUserLoginData={savedUserLoginData}/></PrivateRoute>} />
                <Route path='/test' element={<Test />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
	);
}

const App = () => {
    return (
        <div className="app-container"> 
            <Router>
                <AppLayout />
            </Router>
        </div>
    )
}

export default App;
