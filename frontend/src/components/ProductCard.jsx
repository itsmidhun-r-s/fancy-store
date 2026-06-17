export default function ProductCard({
  product,
  addToCart,
}) {
  const styles = {
    card: {
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "0.3s",
    },
    image: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    title: {
      margin: "15px 0 10px",
      fontSize: "20px",
    },
    description: {
      color: "#666",
      fontSize: "14px",
      minHeight: "40px",
    },
    price: {
      color: "#333",
      margin: "10px 0",
      fontSize: "18px",
      fontWeight: "bold",
    },
    button: {
      width: "100%",
      padding: "10px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#333",
      color: "white",
      borderRadius: "5px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <h3 style={styles.title}>
        {product.name}
      </h3>

      <p style={styles.description}>
        {product.description}
      </p>

      <h4 style={styles.price}>
        ₹{product.price}
      </h4>

      <button
        style={styles.button}
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
}