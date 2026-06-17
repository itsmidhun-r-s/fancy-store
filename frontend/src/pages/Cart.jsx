import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [savedLater, setSavedLater] = useState(() => {
    const saved = localStorage.getItem("savedLater");
    return saved ? JSON.parse(saved) : [];
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState("phone");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [pendingItemId, setPendingItemId] = useState(null);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const updateSavedLater = (updated) => {
    setSavedLater(updated);
    localStorage.setItem("savedLater", JSON.stringify(updated));
  };

  const updateQty = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    updateCart(cart.map((item) => item.id === id ? { ...item, quantity: qty } : item));
  };

  const removeItem = (id) => updateCart(cart.filter((item) => item.id !== id));

  const handleSaveForLater = (id) => {
    setPendingItemId(id);
    setLoginPhone("");
    setLoginEmail("");
    setLoginError("");
    setShowLoginModal(true);
  };

  const confirmSaveForLater = () => {
    // Validate
    if (loginType === "phone") {
      if (!loginPhone.trim() || loginPhone.length < 10) {
        setLoginError("Please enter a valid 10-digit phone number");
        return;
      }
      // Save phone to localStorage so checkout can use it
      localStorage.setItem("userPhone", loginPhone);
      localStorage.removeItem("userEmail");
    } else {
      if (!loginEmail.trim() || !/\S+@\S+\.\S+/.test(loginEmail)) {
        setLoginError("Please enter a valid email address");
        return;
      }
      localStorage.setItem("userEmail", loginEmail);
      localStorage.removeItem("userPhone");
    }

    // Move item to saved later
    const item = cart.find((i) => i.id === pendingItemId);
    if (item) {
      updateSavedLater([...savedLater, { ...item, quantity: 1 }]);
      updateCart(cart.filter((i) => i.id !== pendingItemId));
    }
    setShowLoginModal(false);
    setPendingItemId(null);
  };

  const moveToCart = (id) => {
    const item = savedLater.find((i) => i.id === id);
    if (item) {
      const existing = cart.find((c) => c.id === id);
      if (existing) {
        updateCart(cart.map((c) => c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
      } else {
        updateCart([...cart, { ...item, quantity: 1 }]);
      }
      updateSavedLater(savedLater.filter((i) => i.id !== id));
    }
  };

  const removeSavedItem = (id) => updateSavedLater(savedLater.filter((i) => i.id !== id));

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = cart.reduce((sum, i) => sum + ((i.originalPrice || i.price) - i.price) * i.quantity, 0);
  const delivery = subtotal > 999 ? 0 : 49;
  const total = subtotal + delivery;

  return (
    <div style={{ minHeight: "100vh", background: "#f9f5f5" }}>

      {/* ── Login Modal ── */}
      {showLoginModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            background: "#fff", borderRadius: "20px",
            width: "100%", maxWidth: "400px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
            animation: "fadeIn 0.2s ease",
          }}>
            {/* Modal Header */}
            <div style={{
              background: "linear-gradient(135deg, #725858, #5a3e3e)",
              padding: "22px 24px",
            }}>
              <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: "18px", fontWeight: "700" }}>
                🔖 Save for Later
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "13px" }}>
                Sign in to keep your saved items safe
              </p>
            </div>

            <div style={{ padding: "24px" }}>
              {/* Toggle Phone / Email */}
              <div style={{
                display: "flex", background: "#f5f5f5",
                borderRadius: "12px", padding: "4px", marginBottom: "20px",
              }}>
                {["phone", "email"].map((type) => (
                  <button key={type} onClick={() => { setLoginType(type); setLoginError(""); }} style={{
                    flex: 1, padding: "10px", border: "none", cursor: "pointer",
                    borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                    background: loginType === type ? "#725858" : "transparent",
                    color: loginType === type ? "#fff" : "#666",
                    transition: "all 0.2s",
                  }}>
                    {type === "phone" ? "📱 Phone" : "✉️ Email"}
                  </button>
                ))}
              </div>

              {/* Input */}
              {loginType === "phone" ? (
                <div style={{
                  display: "flex", border: `1.5px solid ${loginError ? "#e85d5d" : "#ddd"}`,
                  borderRadius: "12px", overflow: "hidden", marginBottom: "6px",
                  transition: "border-color 0.2s",
                }}>
                  <div style={{
                    padding: "13px 14px", background: "#f5f5f5",
                    borderRight: "1.5px solid #ddd",
                    fontSize: "14px", fontWeight: "700", color: "#333",
                    display: "flex", alignItems: "center",
                  }}>+91</div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    maxLength={10}
                    value={loginPhone}
                    onChange={(e) => { setLoginPhone(e.target.value.replace(/\D/g, "")); setLoginError(""); }}
                    style={{
                      flex: 1, border: "none", padding: "13px 14px",
                      fontSize: "15px", outline: "none", background: "#fff",
                    }}
                  />
                </div>
              ) : (
                <input
                  type="email"
                  placeholder="Enter your Email ID"
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                  style={{
                    width: "100%", border: `1.5px solid ${loginError ? "#e85d5d" : "#ddd"}`,
                    borderRadius: "12px", padding: "13px 14px",
                    fontSize: "15px", outline: "none",
                    marginBottom: "6px", boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                />
              )}

              {/* Error */}
              {loginError && (
                <p style={{ color: "#e85d5d", fontSize: "12px", margin: "0 0 12px", paddingLeft: "2px" }}>
                  ⚠ {loginError}
                </p>
              )}

              {/* Terms */}
              <p style={{ fontSize: "12px", color: "#999", lineHeight: "1.6", margin: "14px 0 20px" }}>
                By continuing, you confirm that you are above 18 years of age, and you agree to
                Dazzling Rare Fancy's{" "}
                <span style={{ color: "#725858", cursor: "pointer", textDecoration: "underline" }}>Terms of Use</span>
                {" "}and{" "}
                <span style={{ color: "#725858", cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>
              </p>

              {/* Continue Button */}
              <button
                onClick={confirmSaveForLater}
                style={{
                  width: "100%", background: "linear-gradient(135deg, #725858, #5a3e3e)",
                  color: "#fff", border: "none",
                  padding: "14px", borderRadius: "12px",
                  fontSize: "15px", fontWeight: "700",
                  cursor: "pointer", marginBottom: "10px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Continue
              </button>

              {/* Cancel */}
              <button
                onClick={() => { setShowLoginModal(false); setPendingItemId(null); }}
                style={{
                  width: "100%", background: "none",
                  color: "#888", border: "none",
                  padding: "10px", fontSize: "14px",
                  cursor: "pointer", fontWeight: "500",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #725858 0%, #5a3e3e 100%)",
        padding: "24px 30px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", padding: "8px 16px", borderRadius: "8px",
          cursor: "pointer", fontSize: "14px", fontWeight: "500",
        }}>← Back</button>
        <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: "700", margin: 0 }}>
          🛒 My Cart ({totalItems} items)
        </h1>
        <div style={{ width: "80px" }} />
      </div>

      <div style={{
        maxWidth: "1100px", margin: "30px auto", padding: "0 20px",
        display: "grid", gridTemplateColumns: "1fr 340px",
        gap: "24px", alignItems: "start",
      }}>

        {/* Cart Items */}
        <div>
          {cart.length === 0 && savedLater.length === 0 ? (
            <div style={{
              background: "#fff", borderRadius: "16px",
              padding: "60px 20px", textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍️</div>
              <h2 style={{ color: "#725858", marginBottom: "10px" }}>Your cart is empty</h2>
              <p style={{ color: "#888", marginBottom: "24px" }}>Add some products to get started!</p>
              <button onClick={() => navigate("/products")} style={{
                background: "#725858", color: "#fff", border: "none",
                padding: "12px 30px", borderRadius: "10px",
                cursor: "pointer", fontWeight: "600", fontSize: "15px",
              }}>Browse Products</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {cart.map((item) => (
                <div key={item.id} style={{
                  background: "#fff", borderRadius: "16px", padding: "16px",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
                }}>
                  <img src={item.image} alt={item.name} style={{
                    width: "90px", height: "90px", objectFit: "cover",
                    borderRadius: "12px", flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#2d2d2d", margin: "0 0 4px" }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#888", margin: "0 0 8px" }}>{item.description}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "17px", fontWeight: "700", color: "#725858" }}>₹{item.price}</span>
                      {item.originalPrice && (
                        <span style={{ fontSize: "13px", color: "#aaa", textDecoration: "line-through" }}>₹{item.originalPrice}</span>
                      )}
                      {item.originalPrice && (
                        <span style={{ fontSize: "12px", color: "#4caf50", fontWeight: "600" }}>
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% off
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      {/* Qty */}
                      <div style={{
                        display: "flex", alignItems: "center",
                        border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden",
                      }}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{
                          width: "32px", height: "34px", background: "#f5f5f5",
                          border: "none", cursor: "pointer", fontSize: "18px", color: "#555",
                        }}>−</button>
                        <span style={{ width: "36px", textAlign: "center", fontSize: "15px", fontWeight: "600" }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{
                          width: "32px", height: "34px", background: "#f5f5f5",
                          border: "none", cursor: "pointer", fontSize: "18px", color: "#555",
                        }}>+</button>
                      </div>

                      <button onClick={() => handleSaveForLater(item.id)} style={{
                        background: "none", border: "1px solid #725858",
                        color: "#725858", padding: "6px 14px",
                        borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500",
                        transition: "all 0.2s",
                      }}
                        onMouseEnter={(e) => { e.target.style.background = "#725858"; e.target.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.target.style.background = "none"; e.target.style.color = "#725858"; }}
                      >🔖 Save for Later</button>

                      <button onClick={() => removeItem(item.id)} style={{
                        background: "none", border: "1px solid #e85d5d",
                        color: "#e85d5d", padding: "6px 14px",
                        borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500",
                        transition: "all 0.2s",
                      }}
                        onMouseEnter={(e) => { e.target.style.background = "#e85d5d"; e.target.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.target.style.background = "none"; e.target.style.color = "#e85d5d"; }}
                      >🗑 Remove</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Total</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d" }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              ))}

              {/* Saved for Later */}
              {savedLater.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#555", marginBottom: "12px" }}>
                    🔖 Saved for Later ({savedLater.length} items)
                  </h3>
                  {savedLater.map((item) => (
                    <div key={item.id} style={{
                      background: "#fff", borderRadius: "16px", padding: "16px",
                      display: "flex", gap: "16px", alignItems: "center",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                      marginBottom: "12px", border: "1px dashed #ddd",
                    }}>
                      <img src={item.image} alt={item.name} style={{
                        width: "80px", height: "80px", objectFit: "cover",
                        borderRadius: "10px", flexShrink: 0, opacity: 0.85,
                      }} />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#2d2d2d", margin: "0 0 4px" }}>
                          {item.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "16px", fontWeight: "700", color: "#725858" }}>₹{item.price}</span>
                          {item.originalPrice && (
                            <span style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>₹{item.originalPrice}</span>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button onClick={() => moveToCart(item.id)} style={{
                            background: "#725858", color: "#fff", border: "none",
                            padding: "7px 16px", borderRadius: "8px",
                            cursor: "pointer", fontSize: "13px", fontWeight: "600",
                          }}>Move to Cart</button>
                          <button onClick={() => removeSavedItem(item.id)} style={{
                            background: "none", border: "1px solid #e85d5d",
                            color: "#e85d5d", padding: "7px 14px",
                            borderRadius: "8px", cursor: "pointer", fontSize: "13px",
                          }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "24px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            position: "sticky", top: "20px",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d", marginBottom: "20px" }}>
              Order Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                <span>Subtotal ({totalItems} items)</span><span>₹{subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#4caf50" }}>
                <span>Discount</span><span>− ₹{discount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? "#4caf50" : "#555" }}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>
              {delivery === 0 ? (
                <div style={{ background: "#f0faf0", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", color: "#4caf50" }}>
                  🎉 You qualify for free delivery!
                </div>
              ) : (
                <div style={{ background: "#fff8f0", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", color: "#f0a500" }}>
                  Add ₹{999 - subtotal} more for free delivery
                </div>
              )}
            </div>
            <div style={{
              borderTop: "1px solid #eee", paddingTop: "16px", marginBottom: "20px",
              display: "flex", justifyContent: "space-between",
              fontSize: "17px", fontWeight: "700", color: "#2d2d2d",
            }}>
              <span>Total</span><span>₹{total}</span>
            </div>
            <button onClick={() => navigate("/checkout")} style={{
              width: "100%", background: "#725858", color: "#fff",
              border: "none", padding: "14px", borderRadius: "10px",
              cursor: "pointer", fontWeight: "700", fontSize: "15px",
              marginBottom: "10px", transition: "background 0.2s",
            }}
              onMouseEnter={(e) => e.target.style.background = "#5a3e3e"}
              onMouseLeave={(e) => e.target.style.background = "#725858"}
            >
              Proceed to Checkout →
            </button>
            <button onClick={() => navigate("/products")} style={{
              width: "100%", background: "none", color: "#725858",
              border: "1px solid #725858", padding: "12px",
              borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.background = "#725858"; e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.target.style.background = "none"; e.target.style.color = "#725858"; }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}