import React, { useEffect, useState } from "react";
import axios from "axios";

function UserPage() {
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/secured/user", { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                setMessage("Не авторизован");
            });
    }, []);

    return (
        <div>
            <h2>User Page</h2>
            {user ? <p>Вы вошли как: {user}</p> : <p>{message}</p>}
        </div>
    );
}

export default UserPage;