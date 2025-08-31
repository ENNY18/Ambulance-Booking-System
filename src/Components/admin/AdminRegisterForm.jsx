import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState(""); // For troubleshooting

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDebugInfo("Starting registration...");

    try {
      // 1. Verify backend connection
      setDebugInfo("Checking backend health...");
      const healthCheck = await API.get("/health");
      setDebugInfo(`Backend health: ${JSON.stringify(healthCheck.data)}`);

      // 2. Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // 3. Attempt registration
      setDebugInfo("Sending registration request...");
      const response = await API.post(
        "/admin",
        {
          username: formData.username,
          password: formData.password,
          role: formData.role
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Debug": "frontend-request"
          }
        }
      );

      setDebugInfo(`Response received: ${JSON.stringify(response.data)}`);
      console.log("Full response:", response);

      if (response.data && response.data.status === "success") {
        navigate("/admin/dashboard");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMsg);
      setDebugInfo((prev) => `${prev}\nError: ${errorMsg}`);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Register New Admin</h2>
      {error && <div className="error-message">{error}</div>}

      {/* Debug info panel - remove in production */}
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          margin: "10px 0",
          fontSize: "12px",
          whiteSpace: "pre-wrap"
        }}
      >
        <strong>Debug Info:</strong>
        <div>{debugInfo}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="8"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Admin"}
        </button>
      </form>
    </div>
  );
}
