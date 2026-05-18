import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import "./DashboardPage.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function DashboardPage() {

    const [expenses, setExpenses] =
        useState([]);

    useEffect(() => {

        fetchExpenses();

    }, []);

    const fetchExpenses = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/expenses",
                {

                }
            );

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + expense.amount,
        0
    );

    const totalEntries = expenses.length;

    const chartData = {

        labels: expenses.map(
            expense => expense.category
        ),

        datasets: [
            {
                data: expenses.map(
                    expense => expense.amount
                ),

                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0"
                ]
            }
        ]
    };

    return (

        <div className="dashboard-container">

            <div className="navbar">

                <h1>
                    Expense Dashboard 🚀
                </h1>

                <Link to="/home">

                    <button className="nav-btn">

                        Home

                    </button>

                </Link>

            </div>

            <div className="summary-container">

                <div className="card">

                    <h2>
                        ₹ {totalExpenses}
                    </h2>

                    <p>Total Expenses</p>

                </div>

                <div className="card">

                    <h2>
                        {totalEntries}
                    </h2>

                    <p>Total Entries</p>

                </div>

            </div>

            <div className="chart-container">

                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />

            </div>

        </div>
    );
}

export default DashboardPage;