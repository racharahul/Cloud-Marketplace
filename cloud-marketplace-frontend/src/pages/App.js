import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import RoleSelection from "./RoleSelection"; // ⬅️ Import Role Selection Page
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import SellerDashboard from "./SellerDashboard";
import AddProduct from "./AddProduct";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleSelection />} /> {/* ⬅️ Landing Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* ⬅️ Redirect unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
