import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // подключаем стили

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:8080/auth/signin",
                { username, password },
                { withCredentials: true }
            );
            setMessage("Вход успешен!");
        } catch (err) {
            setMessage("Ошибка при входе");
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default SignIn;