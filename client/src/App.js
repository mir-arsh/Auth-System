import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>

              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/admin"
          element={
            <>
              <SignedIn>
                <Admin />
              </SignedIn>

              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback />}
        />

        <Route
          path="/signup/sso-callback"
          element={<AuthenticateWithRedirectCallback />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;