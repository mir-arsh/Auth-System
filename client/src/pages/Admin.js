import { useState, useEffect } from "react";
import useUserData from "../hooks/useUserData";
import "./Admin.css";
import "./Home.css";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const API_BASE = `${process.env.REACT_APP_API_URL}api/users`;

function Admin() {
  const { role, loading, userData } = useUserData();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (!loading && role === "admin") {
      loadUsers();
    }
  }, [loading, role]);

  const changeRole = async (clerkId, newRole) => {
    try {
      const res = await fetch(`${API_BASE}/${clerkId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Role update failed");
      }
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (clerkId) => {
    try {
      const res = await fetch(`${API_BASE}/${clerkId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <nav className="navbar" style={{ justifyContent: "space-between", height: "5vh" }}>
        <Link to="/">
          <button className="btn secondary-btn">
            Home
          </button>
        </Link>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <SignedIn>
          <div className="avatar">
            <UserButton />
          </div>
        </SignedIn>
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
      {loadingUsers ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20}}>
            <thead>
              <tr>
                <th>Clerk ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.clerkId} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{user.clerkId}</td>
                  <td>{user.email}</td>
                  <td>{`${user.firstName || ""} ${user.lastName || ""}`.trim()}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => changeRole(user.clerkId, user.role === "admin" ? "user" : "admin")}
                      style={{ marginRight: 8, width: "120px"
                       }}
                      className="buttonA bta1"
                    >
                      Change Role
                    </button>
                    <button onClick={() => deleteUser(user.clerkId)} style={{ color: "red" }} className="buttonA bta2">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="disclaimer">If you face any issues with the system, please contact support. For reference, please note the clerk ID.</p>
    </div>

  );
}

export default Admin;