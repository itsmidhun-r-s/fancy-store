import { Link } from "react-router-dom";

export default function NotFound() {
  const styles = {
    container: {
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      background: "#f8fafc",
    },

    code: {
      fontSize: "120px",
      fontWeight: "bold",
      color: "#2563eb",
      margin: "0",
    },

    title: {
      fontSize: "32px",
      margin: "10px 0",
      color: "#1e293b",
    },

    text: {
      fontSize: "18px",
      color: "#64748b",
      marginBottom: "25px",
    },

    button: {
      background: "#2563eb",
      color: "#fff",
      padding: "12px 25px",
      textDecoration: "none",
      borderRadius: "8px",
      fontWeight: "600",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>

      <h2 style={styles.title}>
        Page Not Found
      </h2>

      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        style={styles.button}
      >
        Back to Home
      </Link>
    </div>
  );
}