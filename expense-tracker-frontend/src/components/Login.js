import "./Login.css";

import { useState } from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

        /* ADMIN LOGIN */

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "isAdmin",
                true
            );

            alert(
                "Admin Login Successful 👨‍💼"
            );

            navigate("/admin");

            return;
        }

        /* NORMAL USER LOGIN */

        try {

            const response = await axios.get(
                "http://localhost:8080/expenses"
            );

            console.log(response.data);

            localStorage.setItem(
                "isAdmin",
                false
            );

            alert("Login Successful 🚀");

            navigate("/home");

        } catch (error) {

            alert("Invalid Credentials ❌");

            console.log(error);
        }
    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h2>
                    Expense Tracker Login 🚀
                </h2>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    className="login-btn"
                    onClick={handleLogin}
                >

                    Login

                </button>

                <div className="register-text">

                    New User?

                </div>

                <Link to="/register">

                    <button
                        className="register-btn"
                    >

                        Register

                    </button>

                </Link>

            </div>

        </div>
    );
}

export default Login;