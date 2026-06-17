import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "http://localhost/backend";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleRegister = async () => {
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Name, email and password are required");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          password: form.password,
        }),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure XAMPP is running.");
    }

    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #ddd",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf8f8, #f0e8e8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 20px 60px rgba(114,88,88,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #725858, #5a3e3e)",
            padding: "26px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>✨</div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "20px", fontWeight: "800" }}>
            DAZZLING RARE FANCY
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", margin: "6px 0 0", fontSize: "13px" }}>
            Create your account
          </p>
        </div>

        <div style={{ padding: "28px" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#725858",
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "22px",
            }}
          >
            Register
          </h2>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "#fff0f0",
                border: "1px solid #ffcdd2",
                borderRadius: "10px",
                padding: "10px 14px",
                marginBottom: "16px",
                fontSize: "13px",
                color: "#c62828",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Full Name */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#725858")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
              Email Address *
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#725858")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXXXXXXX"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              maxLength={10}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#725858")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
              Password *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                style={{ ...inputStyle, paddingRight: "44px" }}
                onFocus={(e) => (e.target.style.borderColor = "#725858")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: "12px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", fontSize: "16px",
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
              Confirm Password *
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={(e) => handleChange("confirm", e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleRegister(); }}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#725858")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#aaa" : "linear-gradient(135deg, #725858, #5a3e3e)",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "16px",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#725858", fontWeight: "700", textDecoration: "none" }}
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}