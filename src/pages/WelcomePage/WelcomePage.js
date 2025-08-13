import { useState } from "react";
import credentials from '../../data/credentials.json'
import "./WelcomePage.css";

const WelcomePage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const parsedCredentials = Object.entries(credentials).map(([_idx, data]) => { return data })

    const handleLogin = () => {
        if (!username || !password) {
            setMessage("Please enter both username and password.");
            return;
        }

        if (parsedCredentials.some(user => user.username === username && user.password === password )) {
            setMessage("✅ Login successful!");
            localStorage.setItem("user", JSON.stringify(parsedCredentials.find(user => user.username === username && user.password === password )))
        } else {
            setMessage("❌ Invalid username or password.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="welcome-wrapper">
            <div className="welcome-box">
                <h1>Categorized Item List</h1>

                <input
                    type="text"
                    placeholder="Username"
                    className="welcome-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="welcome-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button className="welcome-button" onClick={handleLogin}>
                    Log In
                </button>

                {message && <p className="welcome-message">{message}</p>}
            </div>
        </div>
    );
}

export default WelcomePage;
