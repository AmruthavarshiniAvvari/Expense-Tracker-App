import { Link } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import "./HomePage.css";

function HomePage() {

    const [title, setTitle] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [category, setCategory] =
        useState("");

    const addExpense = async () => {

        try {

            await axios.post(
                "http://localhost:8080/expenses",
                {
                    title: title,
                    amount: Number(amount),
                    category: category,
                    type: "EXPENSE",
                    date: "2026-05-12"
                },
                {

                }
            );

            alert("Expense Added ✅");

            setTitle("");

            setAmount("");

            setCategory("");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="home-container">

            <div className="navbar">

                <h1>
                    Expense Tracker 💰
                </h1>

                <div>

                    <Link to="/dashboard">

                        <button className="nav-btn">

                            Dashboard

                        </button>

                    </Link>

                    <Link to="/expenses">

                        <button className="nav-btn">

                            View Expenses

                        </button>

                    </Link>
                    <Link to="/admin">

                        <button className="nav-btn">
                            Admin
                        </button>

                    </Link>

                </div>

            </div>

            <div className="form-container">

                <h2>
                    Add Expense
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />

                <button onClick={addExpense}>

                    Add Expense

                </button>

            </div>

        </div>
    );
}

export default HomePage;