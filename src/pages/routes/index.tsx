import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import Home from "../home";
import Login from "../login";

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAppContext();
  const location = useLocation();
  if (!state.auth.isAuthenticated) {
    console.log("Redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  else {
    return children
  }
}

const Pages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectRoute>
          <Home />
        </ProtectRoute>
      } />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  )
};

export default Pages