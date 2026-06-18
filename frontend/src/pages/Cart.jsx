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
    if (loginType === "phone") {
      if (!loginPhone.trim() || loginPhone.length < 10) {
        setLoginError("Please enter a valid 10-digit phone number");
        return;
      }
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
    <div style={{ minHeight: "100vh", background: "#f9f5f5", width: "100%", overflowX: "hidden" }}>

      {/* Login Modal */}
      {showLoginModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}>
          <div style={{
            background: "#fff", borderRadius: "20px",
            width: "100%", maxWidth: "380px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ background: "linear-gradient(135deg, #725858, #5a3e3e)", padding: "20px" }}>
              <h2 style={{ color: "#fff", margin: 0, fontSize: "17px", fontWeight: "700" }}>
                🔖 Save for Later
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", margin: "4px 0 0", fontSize: "13px" }}>
                Sign in to keep your saved items safe
              </p>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", background: "#f5f5f5", borderRadius: "10px", padding: "4px", marginBottom: "16px" }}>
                {["phone", "email"].map((type) => (
                  <button key={type} onClick={() => { setLoginType(type); setLoginError(""); }} style={{
                    flex: 1, padding: "9px", border: "none", cursor: "pointer",
                    borderRadius: "8px", fontSize: "14px", fontWeight: "600",
                    background: loginType === type ? "#725858" : "transparent",
                    color: loginType === type ? "#fff" : "#666",
                  }}>
                    {type === "phone" ? "📱 Phone" : "✉️ Email"}
                  </button>
                ))}
              </div>

              {loginType === "phone" ? (
                <div style={{
                  display: "flex", border: `1.5px solid ${loginError ? "#e85d5d" : "#ddd"}`,
                  borderRadius: "10px", overflow: "hidden", marginBottom: "6px",
                }}>
                  <div style={{ padding: "12px", background: "#f5f5f5", borderRight: "1.5px solid #ddd", fontSize: "14px", fontWeight: "700" }}>
                    +91
                  </div>
                  <input
                    type="tel" placeholder="Phone Number" maxLength={10}
                    value={loginPhone}
                    onChange={(e) => { setLoginPhone(e.target.value.replace(/\D/g, "")); setLoginError(""); }}
                    style={{ flex: 1, border: "none", padding: "12px", fontSize: "15px", outline: "none" }}
                  />
                </div>
              ) : (
                <input
                  type="email" placeholder="Enter your Email ID"
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                  style={{
                    width: "100%", border: `1.5px solid ${loginError ? "#e85d5d" : "#ddd"}`,
                    borderRadius: "10px", padding: "12px", fontSize: "15px",
                    outline: "none", marginBottom: "6px", boxSizing: "border-box",
                  }}
                />
              )}
              {loginError && <p style={{ color: "#e85d5d", fontSize: "12px", margin: "0 0 10px" }}>⚠ {loginError}</p>}

              <p style={{ fontSize: "12px", color: "#999", lineHeight: "1.6", margin: "12px 0 16px" }}>
                By continuing, you agree to our{" "}
                <span style={{ color: "#725858", cursor: "pointer" }}>Terms of Use</span> and{" "}
                <span style={{ color: "#725858", cursor: "pointer" }}>Privacy Policy</span>
              </p>

              <button onClick={confirmSaveForLater} style={{
                width: "100%", background: "#725858", color: "#fff", border: "none",
                padding: "13px", borderRadius: "10px", fontSize: "15px", fontWeight: "700",
                cursor: "pointer", marginBottom: "8px",
              }}>Continue</button>
              <button onClick={() => { setShowLoginModal(false); setPendingItemId(null); }} style={{
                width: "100%", background: "none", color: "#888", border: "none",
                padding: "10px", fontSize: "14px", cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #725858, #5a3e3e)",
        padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", padding: "7px 14px", borderRadius: "8px",
          cursor: "pointer", fontSize: "13px", fontWeight: "500", whiteSpace: "nowrap",
        }}>← Back</button>
        <h1 style={{ color: "#fff", fontSize: "clamp(14px, 4vw, 20px)", fontWeight: "700", margin: "0 10px", textAlign: "center" }}>
          🛒 My Cart ({totalItems} items)
        </h1>
        <div style={{ width: "60px" }} />
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "16px" }}>

        {cart.length === 0 && savedLater.length === 0 ? (
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "50px 20px",
            textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛍️</div>
            <h2 style={{ color: "#725858", marginBottom: "10px" }}>Your cart is empty</h2>
            <p style={{ color: "#888", marginBottom: "20px" }}>Add some products to get started!</p>
            <button onClick={() => navigate("/products")} style={{
              background: "#725858", color: "#fff", border: "none",
              padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontWeight: "600",
            }}>Browse Products</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cart.map((item) => (
                <div key={item.id} style={{
                  background: "#fff", borderRadius: "14px",
                  padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
                }}>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                    {/* Image */}
                    <img src={item.image} alt={item.name} style={{
                      width: "80px", height: "80px", objectFit: "cover",
                      borderRadius: "10px", flexShrink: 0,
                    }} />

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: "14px", fontWeight: "600", color: "#2d2d2d",
                        margin: "0 0 4px", overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: "12px", color: "#888", margin: "0 0 6px", lineHeight: "1.4" }}>
                        {item.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#725858" }}>₹{item.price}</span>
                        {item.originalPrice && (
                          <span style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>₹{item.originalPrice}</span>
                        )}
                        {item.originalPrice && (
                          <span style={{ fontSize: "11px", color: "#4caf50", fontWeight: "600" }}>
                            {Math.round((1 - item.price / item.originalPrice) * 100)}% off
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Total */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "11px", color: "#888" }}>Total</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#2d2d2d" }}>
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    {/* Qty */}
                    <div style={{
                      display: "flex", alignItems: "center",
                      border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden",
                    }}>
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{
                        width: "30px", height: "32px", background: "#f5f5f5",
                        border: "none", cursor: "pointer", fontSize: "16px", color: "#555",
                      }}>−</button>
                      <span style={{ width: "32px", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{
                        width: "30px", height: "32px", background: "#f5f5f5",
                        border: "none", cursor: "pointer", fontSize: "16px", color: "#555",
                      }}>+</button>
                    </div>

                    <button onClick={() => handleSaveForLater(item.id)} style={{
                      background: "none", border: "1px solid #725858",
                      color: "#725858", padding: "5px 10px",
                      borderRadius: "7px", cursor: "pointer", fontSize: "12px", fontWeight: "500",
                    }}>🔖 Save for Later</button>

                    <button onClick={() => removeItem(item.id)} style={{
                      background: "none", border: "1px solid #e85d5d",
                      color: "#e85d5d", padding: "5px 10px",
                      borderRadius: "7px", cursor: "pointer", fontSize: "12px", fontWeight: "500",
                    }}>🗑 Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary — full width on mobile */}
            {cart.length > 0 && (
              <div style={{
                background: "#fff", borderRadius: "14px",
                padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}>
                <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#2d2d2d", marginBottom: "16px" }}>
                  Order Summary
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
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
                  borderTop: "1px solid #eee", paddingTop: "14px", marginBottom: "16px",
                  display: "flex", justifyContent: "space-between",
                  fontSize: "17px", fontWeight: "700", color: "#2d2d2d",
                }}>
                  <span>Total</span><span>₹{total}</span>
                </div>
                <button onClick={() => navigate("/checkout")} style={{
                  width: "100%", background: "#725858", color: "#fff", border: "none",
                  padding: "14px", borderRadius: "10px", cursor: "pointer",
                  fontWeight: "700", fontSize: "15px", marginBottom: "10px",
                }}>
                  Proceed to Checkout →
                </button>
                <button onClick={() => navigate("/products")} style={{
                  width: "100%", background: "none", color: "#725858",
                  border: "1px solid #725858", padding: "12px",
                  borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px",
                }}>
                  Continue Shopping
                </button>
              </div>
            )}

            {/* Saved for Later */}
            {savedLater.length > 0 && (
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#555", marginBottom: "10px" }}>
                  🔖 Saved for Later ({savedLater.length} items)
                </h3>
                {savedLater.map((item) => (
                  <div key={item.id} style={{
                    background: "#fff", borderRadius: "14px", padding: "14px",
                    display: "flex", gap: "12px", alignItems: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    marginBottom: "10px", border: "1px dashed #ddd",
                  }}>
                    <img src={item.image} alt={item.name} style={{
                      width: "70px", height: "70px", objectFit: "cover",
                      borderRadius: "10px", flexShrink: 0, opacity: 0.85,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: "13px", fontWeight: "600", color: "#2d2d2d", margin: "0 0 4px" }}>
                        {item.name}
                      </h3>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#725858" }}>₹{item.price}</span>
                      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                        <button onClick={() => moveToCart(item.id)} style={{
                          background: "#725858", color: "#fff", border: "none",
                          padding: "6px 12px", borderRadius: "7px", cursor: "pointer",
                          fontSize: "12px", fontWeight: "600",
                        }}>Move to Cart</button>
                        <button onClick={() => removeSavedItem(item.id)} style={{
                          background: "none", border: "1px solid #e85d5d",
                          color: "#e85d5d", padding: "6px 12px",
                          borderRadius: "7px", cursor: "pointer", fontSize: "12px",
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
    </div>
  );
}