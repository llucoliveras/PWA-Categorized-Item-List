import { useEffect, useState } from "react";
import "./Welcome.css";

const WelcomePage = ({ setSavedUserLoginData }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`./data/users.json`);
                if (!res.ok) throw new Error("File not found");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers()
    }, [])

    const handleLogin = async (user, pass) => {
        user = user.trim();
        pass = pass.trim();

        if (!user || !pass) {
            setMessage("Please enter both username and password.");
            return;
        }

        if (users?.some(userObj => userObj.username === user && userObj.password === pass)) {
            setMessage("✅ Login successful!");
            await new Promise(res => setTimeout(res, 500))
            const foundUser = users.find(userObj => userObj.username === user && userObj.password === pass)
            setSavedUserLoginData(foundUser)
            localStorage.setItem("user", JSON.stringify(foundUser))
        } else {
            setMessage("❌ Invalid username or password.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin(username, password)
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

                <button className="welcome-button" onClick={() => {handleLogin(username, password)}}>
                    Log In
                </button>

                {message && <p className="welcome-message">{message}</p>}

                <p className="example-login-text" onClick={() => {handleLogin("example", "example")}}>
                    Try an example of this app
                </p>
            </div>
        </div>
    );
}

export default WelcomePage;
