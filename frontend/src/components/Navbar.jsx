import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [hovered, setHovered] = useState("");

  const styles = {
    navbar: {
      backgroundColor: "#725858",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    },

    logo: {
      color: hovered === "logo" ? "#ffd700" : "white",
      textDecoration: "none",
      fontSize: "26px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },

    navLinks: {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      margin: 0,
      padding: 0,
    },

    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "17px",
      padding: "8px 14px",
      borderRadius: "5px",
      transition: "all 0.3s ease",
    },

    hoverLink: {
      backgroundColor: "white",
      color: "#725858",
    },

    loginBtn: {
      backgroundColor:
        hovered === "login" ? "#e68900" : "#ff9800",
      color: "white",
      fontWeight: "bold",
      padding: "8px 14px",
      borderRadius: "5px",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div>
        <Link
          to="/"
          style={styles.logo}
          onMouseEnter={() => setHovered("logo")}
          onMouseLeave={() => setHovered("")}
        >
          🇩​🇦​🇿​🇿​🇱​🇮​🇳​🇬​ 🇷​🇦​🇷​🇪​ 🇫​🇦​🇳​🇨​🇾​
        </Link>
      </div>

      <ul style={styles.navLinks}>
        {["Home", "About", "Products", "Cart"].map((item) => (
          <li key={item}>
            <Link
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase()}`
              }
              style={{
                ...styles.navLink,
                ...(hovered === item
                  ? styles.hoverLink
                  : {}),
              }}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered("")}
            >
              {item}
            </Link>
          </li>
        ))}

        <li>
          <Link
            to="/login"
            style={styles.loginBtn}
            onMouseEnter={() => setHovered("login")}
            onMouseLeave={() => setHovered("")}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}