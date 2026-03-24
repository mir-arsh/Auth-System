import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./Home.css";
import useUserData from "../hooks/useUserData";
import "./Dashboard.css"

function Dashboard() {
  const { userData, loading, error } = useUserData();

  return (
    <>
      <nav className="navbar" style={{ justifyContent: "space-between", height: "5vh" }}>
        <Link to="/">
          <button className="btn secondary-btn">
            Home
          </button>
        </Link>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <div className="avatar">
          <UserButton />
        </div>
      </nav>
      <h2 className="dash-h2">Welcome to your dashboard, {userData?.firstName || "there"}!</h2>
      <p>
        {loading ? (
          <span>Loading user data...</span>
        ) : error ? (
          <span>Error: {error}</span>
        ) : userData ? (
          <div>
            <strong>Email:</strong> {userData.email}<br />
            <strong>First Name:</strong> {userData.firstName}<br />
            <strong>Last Name:</strong> {userData.lastName}<br />
            <strong>Role:</strong> {userData.role}<br />
            <strong>Clerk ID:</strong> {userData.clerkId}
          </div>
        ) : (
          <span>No user data available</span>
        )}
      </p>
      <p>If you face any issues with the system, please contact support. For reference, please note the clerk ID.</p>
    </>
  )
}

export default Dashboard;