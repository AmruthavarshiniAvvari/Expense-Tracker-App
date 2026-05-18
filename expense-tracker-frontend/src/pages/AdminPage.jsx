import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import "./AdminPage.css";

function AdminPage() {

    const [expenses, setExpenses] =
        useState([]);

    useEffect(() => {

        fetchExpenses();

    }, []);

    const fetchExpenses = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/expenses"
            );

            console.log(response.data);

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteExpense = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/expenses/${id}`
            );


            fetchExpenses();

        } catch (error) {

            console.log(error);
        }
    };

    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + expense.amount,
        0
    );
    const isAdmin =
        localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {

        return <Navigate to="/home" />;
    }

    return (

        <div className="admin-container">

            {/* NAVBAR */}

            <div className="navbar">

                <h1>
                    Admin Dashboard 👨‍💼
                </h1>

                <Link to="/home">

                    <button className="nav-btn">

                        Home

                    </button>

                </Link>

            </div>

            {/* SUMMARY */}

            <div className="summary-container">

                <div className="card">

                    <h2>
                        {expenses.length}
                    </h2>

                    <p>Total Expenses</p>

                </div>

                <div className="card">

                    <h2>
                        ₹ {totalExpenses}
                    </h2>

                    <p>Total Amount</p>

                </div>

            </div>

            {/* TABLE */}

            <table>

                <thead>

                <tr>

                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Delete</th>

                </tr>

                </thead>

                <tbody>

                {

                    expenses.map(
                        (expense) => (

                            <tr key={expense.id}>

                                <td>
                                    {expense.title}
                                </td>

                                <td>
                                    ₹ {expense.amount}
                                </td>

                                <td>
                                    {expense.category}
                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteExpense(
                                                expense.id
                                            )
                                        }
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>
                        )
                    )
                }

                </tbody>

            </table>

        </div>
    );
}

export default AdminPage;