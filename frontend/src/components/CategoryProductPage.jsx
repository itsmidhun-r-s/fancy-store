import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryProductPage({ title, products }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedId, setAddedId] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  const getQty = (id) => quantities[id] || 1;

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  const handleAddToCart = (product) => {
    const qty = getQty(product.id);
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: qty }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f5f5" }}>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #725858 0%, #5a3e3e 100%)",
          padding: "50px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate("/products")}
          style={{
            position: "absolute", left: "20px", top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", padding: "8px 16px",
            borderRadius: "8px", cursor: "pointer",
            fontSize: "14px", fontWeight: "500",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.15)"}
        >
          ← Back
        </button>

        {/* Cart Icon */}
        <button
          onClick={() => navigate("/cart")}
          style={{
            position: "absolute", right: "20px", top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", padding: "8px 16px",
            borderRadius: "8px", cursor: "pointer",
            fontSize: "14px", fontWeight: "500",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.15)"}
        >
          🛒 Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
        </button>

        <h1 style={{ color: "#fff", fontSize: "2.2rem", fontWeight: "700", margin: 0 }}>
          {title}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "10px", fontSize: "15px" }}>
          {products.length} products available
        </p>
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "24px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: hoveredCard === product.id
                  ? "0 12px 35px rgba(114,88,88,0.25)"
                  : "0 4px 15px rgba(0,0,0,0.08)",
                transform: hoveredCard === product.id ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transform: hoveredCard === product.id ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                />
                {product.badge && (
                  <span style={{
                    position: "absolute", top: "12px", left: "12px",
                    background: product.badge === "New" ? "#e85d5d" : "#f0a500",
                    color: "#fff", fontSize: "11px", fontWeight: "700",
                    padding: "4px 10px", borderRadius: "20px",
                  }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "16px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#2d2d2d", margin: "0 0 6px" }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 10px", lineHeight: "1.5" }}>
                  {product.description}
                </p>

                {/* Stars */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} style={{ color: star <= product.rating ? "#f0a500" : "#ddd", fontSize: "13px" }}>★</span>
                  ))}
                  <span style={{ fontSize: "12px", color: "#888" }}>({product.reviews})</span>
                </div>

                {/* Price */}
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "700", color: "#725858" }}>
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span style={{ fontSize: "13px", color: "#aaa", textDecoration: "line-through", marginLeft: "6px" }}>
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span style={{ fontSize: "12px", color: "#4caf50", fontWeight: "600", marginLeft: "6px" }}>
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  )}
                </div>

                {/* Quantity + Add to Cart */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* Qty selector */}
                  <div style={{
                    display: "flex", alignItems: "center",
                    border: "1px solid #ddd", borderRadius: "8px",
                    overflow: "hidden",
                  }}>
                    <button
                      onClick={() => handleQtyChange(product.id, Math.max(1, getQty(product.id) - 1))}
                      style={{
                        width: "28px", height: "34px",
                        background: "#f5f5f5", border: "none",
                        cursor: "pointer", fontSize: "16px",
                        color: "#555", fontWeight: "600",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#e8e8e8"}
                      onMouseLeave={(e) => e.target.style.background = "#f5f5f5"}
                    >
                      −
                    </button>
                    <span style={{
                      width: "30px", textAlign: "center",
                      fontSize: "14px", fontWeight: "600", color: "#2d2d2d",
                    }}>
                      {getQty(product.id)}
                    </span>
                    <button
                      onClick={() => handleQtyChange(product.id, getQty(product.id) + 1)}
                      style={{
                        width: "28px", height: "34px",
                        background: "#f5f5f5", border: "none",
                        cursor: "pointer", fontSize: "16px",
                        color: "#555", fontWeight: "600",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#e8e8e8"}
                      onMouseLeave={(e) => e.target.style.background = "#f5f5f5"}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      flex: 1,
                      background: addedId === product.id ? "#4caf50" : "#725858",
                      color: "#fff", border: "none",
                      padding: "8px 10px", borderRadius: "8px",
                      cursor: "pointer", fontSize: "12px", fontWeight: "600",
                      transition: "background 0.2s, transform 0.15s",
                      transform: addedId === product.id ? "scale(0.97)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (addedId !== product.id) e.target.style.background = "#5a3e3e";
                    }}
                    onMouseLeave={(e) => {
                      if (addedId !== product.id) e.target.style.background = "#725858";
                    }}
                  >
                    {addedId === product.id ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}