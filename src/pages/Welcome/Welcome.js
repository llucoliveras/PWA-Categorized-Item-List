import { useEffect, useState } from "react";
import "./Welcome.css";

const WelcomePage = ({ setSavedUserLoginData }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [credentials, setCredentials] = useState(null)

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const res = await fetch(`./data/credentials.json`);
                if (!res.ok) throw new Error("File not found");
                const data = await res.json();
                setCredentials(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCredentials()
    }, [])

    const handleLogin = async (user = username, pass = password) => {
        user = user.trim();
        pass = pass.trim();

        if (!user || !pass) {
            setMessage("Please enter both username and password.");
            return;
        }

        if (credentials?.some(userObj => userObj.username === user && userObj.password === pass)) {
            setMessage("✅ Login successful!");
            await new Promise(res => setTimeout(res, 500))
            const foundCredentials = credentials.find(userObj => userObj.username === user && userObj.password === pass)
            setSavedUserLoginData(foundCredentials)
            localStorage.setItem("user", JSON.stringify(foundCredentials))
        } else {
            setMessage("❌ Invalid username or password.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }

    const handleExampleLogin = () => {
        handleLogin("example", "example");
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

                <p className="example-login-text" onClick={handleExampleLogin}>
                    Try an example of this app
                </p>
            </div>
        </div>
    );
}

export default WelcomePage;
