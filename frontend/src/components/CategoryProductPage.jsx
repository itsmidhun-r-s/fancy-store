import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function CategoryProductPage({ title, products }) {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div style={styles.page}>
      <div style={styles.topButtons}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <button style={styles.cartBtn} onClick={() => navigate("/cart")}>
          <FaShoppingCart /> Cart
        </button>
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.count}>{products.length} products available</p>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <div style={styles.imageBox}>
              {product.badge && (
                <span style={styles.badge}>{product.badge}</span>
              )}

              <img src={product.image} alt={product.name} style={styles.image} />
            </div>

            <div style={styles.content}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>

              <p style={styles.price}>
                ₹{product.price}
                <span style={styles.oldPrice}> ₹{product.originalPrice}</span>
              </p>

              <button
                style={styles.addBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f7",
  },

  topButtons: {
    background: "#725858",
    padding: "18px 18px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backBtn: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },

  cartBtn: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },

  header: {
    background: "#725858",
    color: "#fff",
    textAlign: "center",
    padding: "10px 15px 30px",
  },

  title: {
    fontSize: "28px",
    margin: "0 0 8px",
  },

  count: {
    margin: 0,
    fontSize: "14px",
  },

  grid: {
    padding: "25px 18px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },

  imageBox: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#ef4444",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  content: {
    padding: "15px",
  },

  productName: {
    margin: "0 0 6px",
    fontSize: "16px",
  },

  description: {
    margin: "0 0 10px",
    fontSize: "13px",
    color: "#666",
  },

  price: {
    fontWeight: "bold",
    margin: "0 0 12px",
  },

  oldPrice: {
    color: "#888",
    textDecoration: "line-through",
    fontSize: "13px",
    marginLeft: "6px",
  },

  addBtn: {
    width: "100%",
    background: "#725858",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};