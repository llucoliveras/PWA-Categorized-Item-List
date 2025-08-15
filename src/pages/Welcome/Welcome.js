import { useEffect, useState } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [credentials, setCredentials] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const res = await fetch(`/data/credentials.json`);
                if (!res.ok) throw new Error("File not found");
                const data = await res.json();
                setCredentials(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCredentials()
    }, [])

    const handleLogin = async () => {
        if (!username || !password) {
            setMessage("Please enter both username and password.");
            return;
        }

        if (credentials.some(user => user.username === username && user.password === password )) {
            setMessage("✅ Login successful!");
            localStorage.setItem("user", JSON.stringify(credentials.find(user => user.username === username && user.password === password )))
            await new Promise(res => setTimeout(res, 500))
            navigate("/home")
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
