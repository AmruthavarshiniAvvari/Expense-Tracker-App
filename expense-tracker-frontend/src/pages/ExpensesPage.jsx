import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import "./ExpensesPage.css";

function ExpensesPage() {

    const [expenses, setExpenses] =
        useState([]);

    const [filterCategory, setFilterCategory] =
        useState("");
    const [editingId, setEditingId] =
        useState(null);
    const [showEditForm, setShowEditForm] =
        useState(false);

    const [title, setTitle] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [category, setCategory] =
        useState("");

    useEffect(() => {

        fetchExpenses();

    }, []);

    const fetchExpenses = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/expenses",
                {
                    auth: {
                        username:
                            localStorage.getItem("username"),

                        password:
                            localStorage.getItem("password")
                    }
                }
            );

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteExpense = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/expenses/${id}`,
                {
                    auth: {
                        username:
                            localStorage.getItem("username"),

                        password:
                            localStorage.getItem("password")
                    }
                }
            );

            fetchExpenses();

        } catch (error) {

            console.log(error);
        }
    };
    const editExpense = (expense) => {

        setTitle(expense.title);

        setAmount(expense.amount);

        setCategory(expense.category);

        setEditingId(expense.id);

        setShowEditForm(true);
    };
    const updateExpense = async () => {

        try {

            await axios.put(
                `http://localhost:8080/expenses/${editingId}`,
                {
                    title: title,
                    amount: Number(amount),
                    category: category,
                    type: "EXPENSE",
                    date: "2026-05-12"
                },
                {
                    auth: {
                        username:
                            localStorage.getItem("username"),

                        password:
                            localStorage.getItem("password")
                    }
                }
            );

            fetchExpenses();

            setTitle("");

            setAmount("");

            setCategory("");

            setEditingId(null);
            setShowEditForm(false);

        } catch (error) {

            console.log(error);
        }
    };

    const filteredExpenses = filterCategory

        ? expenses.filter(
            expense =>
                expense.category ===
                filterCategory
        )

        : expenses;

    return (

        <div className="expenses-container">

            <div className="navbar">

                <h1>
                    View Expenses 📋
                </h1>

                <Link to="/home">

                    <button className="nav-btn">

                        Home

                    </button>

                </Link>

            </div>
            {
                showEditForm && (

                    <div className="form-container">

                <h2>
                    Edit Expense
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

                <button onClick={updateExpense}>

                    Update Expense

                </button>

            </div>
                )
            }

            <div className="filter-container">

                <select
                    value={filterCategory}
                    onChange={(e) =>
                        setFilterCategory(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Categories
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>
                    <option value="Shopping">
                        Electronics
                    </option>
                    <option value="Shopping">
                        Bills
                    </option>
                    <option value="Shopping">
                        Fees
                    </option>

                </select>

            </div>

            <table>

                <thead>

                <tr>

                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>

                </thead>

                <tbody>

                {

                    filteredExpenses.map(
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
                                        className="edit-btn"
                                        onClick={() =>
                                            editExpense(expense)
                                        }
                                    >

                                        Edit

                                    </button>

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

export default ExpensesPage;