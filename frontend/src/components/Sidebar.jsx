import { Link } from "react-router-dom";

export default function Sidebar() {
  const styles = {
    sidebar: {
      width: "250px",
      minHeight: "100vh",
      background: "#1e293b",
      color: "#fff",
      padding: "20px",
    },

    title: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "24px",
      fontWeight: "bold",
    },

    menu: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },

    item: {
      marginBottom: "15px",
    },

    link: {
      color: "#fff",
      textDecoration: "none",
      display: "block",
      padding: "12px",
      borderRadius: "8px",
      background: "#334155",
    },
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>
        Fancy Store
      </h2>

      <ul style={styles.menu}>
        <li style={styles.item}>
          <Link
            to="/admin"
            style={styles.link}
          >
            Dashboard
          </Link>
        </li>

        <li style={styles.item}>
          <Link
            to="/admin/products"
            style={styles.link}
          >
            Products
          </Link>
        </li>

        <li style={styles.item}>
          <Link
            to="/admin/categories"
            style={styles.link}
          >
            Categories
          </Link>
        </li>

        <li style={styles.item}>
          <Link
            to="/admin/customers"
            style={styles.link}
          >
            Customers
          </Link>
        </li>

        <li style={styles.item}>
          <Link
            to="/admin/orders"
            style={styles.link}
          >
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}