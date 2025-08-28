import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserPage from "./UserPage";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/signin">Sign In</Link> |{" "}
                <Link to="/signup">Sign Up</Link> |{" "}
                <Link to="/user">User Page</Link>
            </nav>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </Router>
    );
}

export default App;