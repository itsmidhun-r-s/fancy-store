import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Cart", path: "/cart" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        background: "linear-gradient(135deg, #725858, #5a3e3e)",
        position: "sticky",
        top: 0,
        zIndex: 999,
        width: "100%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: "52px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}>
          {/* Brand */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#fff",
              fontWeight: "800",
              fontSize: "15px",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            ✨ DAZZLING RARE FANCY
          </Link>

          {/* Desktop Links */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            flexShrink: 0,
          }}
            id="desktop-links"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive(link.path) ? "#fff" : "rgba(255,255,255,0.8)",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: isActive(link.path) ? "700" : "500",
                  background: isActive(link.path) ? "rgba(255,255,255,0.15)" : "transparent",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={handleLogout} style={{
                background: "#ff9800", color: "#fff", border: "none",
                padding: "7px 14px", borderRadius: "8px",
                cursor: "pointer", fontWeight: "700", fontSize: "13px",
                marginLeft: "6px", whiteSpace: "nowrap",
              }}>
                Logout
              </button>
            ) : (
              <Link to="/login" style={{
                background: "#ff9800", color: "#fff",
                padding: "7px 14px", borderRadius: "8px",
                fontWeight: "700", fontSize: "13px",
                marginLeft: "6px", whiteSpace: "nowrap",
              }}>
                Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            id="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "8px",
              display: "none",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
            }}
          >
            <span style={{
              display: "block", width: "18px", height: "2px",
              background: "#fff", borderRadius: "2px",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              transition: "all 0.25s",
            }} />
            <span style={{
              display: "block", width: "18px", height: "2px",
              background: "#fff", borderRadius: "2px",
              opacity: menuOpen ? 0 : 1,
              transition: "all 0.25s",
            }} />
            <span style={{
              display: "block", width: "18px", height: "2px",
              background: "#fff", borderRadius: "2px",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              transition: "all 0.25s",
            }} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          id="mobile-menu"
          style={{
            display: menuOpen ? "block" : "none",
            background: "#4a2e2e",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            width: "100%",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                color: isActive(link.path) ? "#ff9800" : "rgba(255,255,255,0.9)",
                padding: "14px 20px",
                fontSize: "15px",
                fontWeight: isActive(link.path) ? "700" : "500",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: isActive(link.path) ? "rgba(255,255,255,0.05)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ padding: "12px 16px 16px" }}>
            {user ? (
              <>
                <div style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  marginBottom: "8px",
                  paddingLeft: "4px",
                }}>
                  👤 {user.name || user.email}
                </div>
                <button onClick={handleLogout} style={{
                  width: "100%", background: "#ff9800",
                  color: "#fff", border: "none",
                  padding: "13px", borderRadius: "10px",
                  cursor: "pointer", fontWeight: "700", fontSize: "15px",
                }}>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", width: "100%",
                  background: "#ff9800", color: "#fff",
                  padding: "13px", borderRadius: "10px",
                  fontWeight: "700", fontSize: "15px",
                  textAlign: "center",
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          #desktop-links { display: none !important; }
          #hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          #mobile-menu { display: none !important; }
          #hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}