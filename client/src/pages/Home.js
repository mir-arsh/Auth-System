import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./Home.css";
import useUserData from "../hooks/useUserData";

function Home() {
  const { role, loading } = useUserData();

  return (
    <div className="home-container">

      <nav className="navbar">

        <h2 className="logo">AuthSystem</h2>

        <SignedIn>
          <div className="avatar">
            <UserButton />
          </div>
        </SignedIn>

      </nav>

      <div className="hero">

        <h1>Secure Authentication System</h1>

        <p>
          Authentication system built with React, Node.js,
          MongoDB and Clerk authentication. Includes functions such as login, signup, protected role, profile update, and role based access. There are separate dashboards for user and admin.
        </p>

        <SignedOut>

          <div className="hero-buttons">

            <Link to="/signup">
              <button className="btn primary-btn">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="btn secondary-btn">
                Login
              </button>
            </Link>

          </div>

        </SignedOut>

        <SignedIn>

          <div className="hero-buttons">

            <Link to={role === "admin" ? "/admin" : "/dashboard"}>
              <button className="btn primary-btn" disabled={loading}>
                Dashboard
              </button>
            </Link>

          </div>

        </SignedIn>

      </div>

    </div>
  );
}

export default Home;