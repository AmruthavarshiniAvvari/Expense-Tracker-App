import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";


import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ExpensesPage from "./pages/ExpensesPage";
import AdminPage from "./pages/AdminPage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/home"
                    element={<HomePage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/expenses"
                    element={<ExpensesPage />}
                />
                <Route
                    path="/admin"
                    element={<AdminPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;