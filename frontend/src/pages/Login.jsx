import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "http://localhost/backend";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  setError("");

  if (!email.trim() || !password.trim()) {
    setError("Please enter both email and password");
    return;
  }

  setLoading(true);

  try {
    // ==========================
    // ADMIN LOGIN
    // Username: admin
    // Password: admin123
    // ==========================
    if (email === "admin" && password === "admin123") {
      const adminUser = {
        id: 0,
        name: "Administrator",
        email: "admin",
        role: "admin",
      };

      localStorage.setItem(
        "user",
        JSON.stringify(adminUser)
      );

      navigate("/admin");
      return;
    }

    // ==========================
    // REGISTERED USER LOGIN
    // ==========================
    const res = await fetch(
      `${BASE_URL}/auth/login.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const result = await res.json();

    if (result.success) {
      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      navigate("/");
    } else {
      setError(
        result.message ||
          "Invalid email or password"
      );
    }
  } catch (err) {
    console.error(err);

    setError(
      "Cannot connect to server. Make sure XAMPP is running."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf8f8, #f0e8e8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(114,88,88,0.15)",
        }}
      >
        {/* Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #725858, #5a3e3e)",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>✨</div>
          <h1
            style={{
              color: "#fff",
              margin: 0,
              fontSize: "20px",
              fontWeight: "800",
            }}
          >
            DAZZLING RARE FANCY
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              margin: "6px 0 0",
              fontSize: "13px",
            }}
          >
            Sign in to your account
          </p>
        </div>

        <div style={{ padding: "30px" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#725858",
              marginBottom: "22px",
            }}
          >
            Login
          </h2>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "#fff0f0",
                border: "1px solid #ffcdd2",
                color: "#c62828",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "13px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#555",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1.5px solid #ddd",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#725858")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#555",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 14px",
                  border: "1.5px solid #ddd",
                  borderRadius: "10px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#725858")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#aaa"
                : "linear-gradient(135deg, #725858, #5a3e3e)",
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
            {loading ? "Signing in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#725858",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}