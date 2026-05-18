import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";



function Register() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const registerUser = async () => {

        try {

            await axios.post(
                "http://localhost:8080/auth/register",
                {
                    username,
                    password
                }
            );

            alert(
                "Registration Successful ✅"
            );

            navigate("/");

        } catch (error) {

            alert("Registration Failed ❌");

            console.log(error);
        }
    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h2>Create Account 🚀</h2>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="login-btn"
                    onClick={registerUser}
                >
                    Register
                </button>

                <div className="register-text">
                    Already have an account?
                </div>

                <button
                    className="register-btn"
                    onClick={() => navigate("/")}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Register;