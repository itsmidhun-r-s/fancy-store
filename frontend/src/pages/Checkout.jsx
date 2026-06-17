import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // ── Auto-fill phone/email from Save for Later login ──
  const savedPhone = localStorage.getItem("userPhone") || "";
  const savedEmail = localStorage.getItem("userEmail") || "";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: savedEmail,       // ← auto-filled
    phone: savedPhone,       // ← auto-filled
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [payMethod, setPayMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = cart.reduce((sum, i) => sum + ((i.originalPrice || i.price) - i.price) * i.quantity, 0);
  const delivery = subtotal > 999 ? 0 : 49;
  const total = subtotal + delivery;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = "Valid pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

 const handlePlaceOrder = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.id) {
    // Connected to backend
    try {
      const result = await api.placeOrder({
        user_id:    user.id,
        items:      cart,
        total:      total,
        address:    form.address,
        city:       form.city,
        state:      form.state,
        pincode:    form.pincode,
        phone:      form.phone,
        pay_method: payMethod,
      });
      if (!result.success) {
        alert("Order failed: " + result.message);
        return;
      }
    } catch (err) {
      console.error("Order API error:", err);
    }
  }

  // Clear localStorage cart regardless
  localStorage.removeItem("cart");
  localStorage.removeItem("userPhone");
  localStorage.removeItem("userEmail");
  setStep(3);
};

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 14px",
    border: `1.5px solid ${errors[field] ? "#e85d5d" : "#ddd"}`,
    borderRadius: "10px", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
    background: "#fff", transition: "border-color 0.2s",
  });

  // ── Success Screen ──
  if (step === 3) return (
    <div style={{ minHeight: "100vh", background: "#f9f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "50px 40px",
        textAlign: "center", maxWidth: "480px", width: "100%",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      }}>
        <div style={{ fontSize: "72px", marginBottom: "20px" }}>🎉</div>
        <h2 style={{ color: "#725858", fontSize: "26px", fontWeight: "800", marginBottom: "12px" }}>
          Order Placed Successfully!
        </h2>
        <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.7", marginBottom: "10px" }}>
          Thank you, <strong>{form.fullName}</strong>! Your order has been confirmed.
        </p>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "30px" }}>
          Confirmation sent to <strong>{form.email}</strong>
        </p>
        <div style={{
          background: "#fdf8f8", borderRadius: "12px", padding: "16px",
          marginBottom: "28px", border: "1px solid #f0e8e8",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span style={{ color: "#888" }}>Order Total</span>
            <span style={{ fontWeight: "700", color: "#725858" }}>₹{total}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#888" }}>Payment</span>
            <span style={{ fontWeight: "600", color: "#2d2d2d" }}>
              {payMethod === "cod" ? "Cash on Delivery" : payMethod === "upi" ? "UPI" : "Card"}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginTop: "8px" }}>
            <span style={{ color: "#888" }}>Delivery to</span>
            <span style={{ fontWeight: "600", color: "#2d2d2d" }}>{form.city}, {form.state}</span>
          </div>
        </div>
        <button onClick={() => navigate("/")} style={{
          width: "100%", background: "#725858", color: "#fff",
          border: "none", padding: "14px", borderRadius: "10px",
          cursor: "pointer", fontWeight: "700", fontSize: "15px", marginBottom: "10px",
        }}>Back to Home</button>
        <button onClick={() => navigate("/products")} style={{
          width: "100%", background: "none", color: "#725858",
          border: "1px solid #725858", padding: "12px",
          borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px",
        }}>Continue Shopping</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f9f5f5" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #725858, #5a3e3e)",
        padding: "22px 30px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => step === 1 ? navigate("/cart") : setStep(step - 1)} style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", padding: "8px 16px", borderRadius: "8px",
          cursor: "pointer", fontSize: "14px", fontWeight: "500",
        }}>← Back</button>
        <h1 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: "700", margin: 0 }}>Checkout</h1>
        <div style={{ width: "80px" }} />
      </div>

      {/* Step Indicator */}
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 20px 0" }}>
        {["Delivery Address", "Payment", "Confirm"].map((label, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 6px",
                background: step > i + 1 ? "#4caf50" : step === i + 1 ? "#725858" : "#ddd",
                color: "#fff", fontWeight: "700", fontSize: "14px",
              }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <div style={{
                fontSize: "11px", whiteSpace: "nowrap",
                color: step === i + 1 ? "#725858" : "#888",
                fontWeight: step === i + 1 ? "700" : "400",
              }}>{label}</div>
            </div>
            {i < 2 && <div style={{ width: "60px", height: "2px", background: step > i + 1 ? "#4caf50" : "#ddd", margin: "0 8px 20px" }} />}
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: "1050px", margin: "20px auto", padding: "0 20px",
        display: "grid", gridTemplateColumns: "1fr 320px",
        gap: "24px", alignItems: "start",
      }}>

        {/* Step 1 — Address */}
        {step === 1 && (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d", marginBottom: "22px" }}>
              📍 Delivery Address
            </h2>

            {/* Auto-fill notice */}
            {(savedPhone || savedEmail) && (
              <div style={{
                background: "#f0faf0", border: "1px solid #c8e6c9",
                borderRadius: "10px", padding: "10px 14px",
                marginBottom: "18px", fontSize: "13px", color: "#388e3c",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                ✅ Your {savedPhone ? "phone number" : "email"} has been auto-filled from your saved login
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { label: "Full Name *", field: "fullName", placeholder: "Enter your full name", col: "1 / 3", type: "text" },
                { label: "Email *", field: "email", placeholder: "Enter your email", col: "1 / 2", type: "email" },
                { label: "Phone Number *", field: "phone", placeholder: "10-digit phone number", col: "2 / 3", type: "tel" },
                { label: "Full Address *", field: "address", placeholder: "House No, Street, Area", col: "1 / 3", type: "text" },
                { label: "City *", field: "city", placeholder: "City", col: "1 / 2", type: "text" },
                { label: "State *", field: "state", placeholder: "State", col: "2 / 3", type: "text" },
                { label: "Pincode *", field: "pincode", placeholder: "6-digit Pincode", col: "1 / 2", type: "text" },
              ].map(({ label, field, placeholder, col, type }) => (
                <div key={field} style={{ gridColumn: col }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={placeholder}
                    maxLength={field === "phone" ? 10 : field === "pincode" ? 6 : undefined}
                    style={inputStyle(field)}
                    onFocus={(e) => e.target.style.borderColor = "#725858"}
                    onBlur={(e) => e.target.style.borderColor = errors[field] ? "#e85d5d" : "#ddd"}
                  />
                  {errors[field] && (
                    <p style={{ color: "#e85d5d", fontSize: "11px", margin: "4px 0 0" }}>⚠ {errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => { if (validate()) setStep(2); }}
              style={{
                marginTop: "24px", width: "100%",
                background: "linear-gradient(135deg, #725858, #5a3e3e)",
                color: "#fff", border: "none", padding: "14px",
                borderRadius: "10px", cursor: "pointer",
                fontWeight: "700", fontSize: "15px", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.opacity = "0.9"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              Continue to Payment →
            </button>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d", marginBottom: "22px" }}>
              💳 Payment Method
            </h2>
            {[
              { id: "cod", icon: "💵", label: "Cash on Delivery", desc: "Pay when your order arrives" },
              { id: "upi", icon: "📱", label: "UPI Payment", desc: "GPay, PhonePe, Paytm, BHIM" },
              { id: "card", icon: "💳", label: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay" },
            ].map((method) => (
              <div key={method.id} onClick={() => setPayMethod(method.id)} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "16px", borderRadius: "12px", marginBottom: "12px",
                border: `2px solid ${payMethod === method.id ? "#725858" : "#eee"}`,
                background: payMethod === method.id ? "#fdf8f8" : "#fff",
                cursor: "pointer", transition: "all 0.2s",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: payMethod === method.id ? "#725858" : "#f5f5f5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", flexShrink: 0, transition: "background 0.2s",
                }}>{method.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", fontSize: "15px", color: "#2d2d2d" }}>{method.label}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{method.desc}</div>
                </div>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  border: `2px solid ${payMethod === method.id ? "#725858" : "#ddd"}`,
                  background: payMethod === method.id ? "#725858" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {payMethod === method.id && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />}
                </div>
              </div>
            ))}

            {payMethod === "upi" && (
              <input placeholder="Enter UPI ID (e.g. name@upi)" style={{
                width: "100%", padding: "12px 14px", border: "1.5px solid #ddd",
                borderRadius: "10px", fontSize: "14px", outline: "none",
                boxSizing: "border-box", marginTop: "8px",
              }} />
            )}

            {payMethod === "card" && (
              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <input placeholder="Card Number" maxLength={19} style={{
                  width: "100%", padding: "12px 14px", border: "1.5px solid #ddd",
                  borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box",
                }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <input placeholder="MM / YY" maxLength={5} style={{ padding: "12px 14px", border: "1.5px solid #ddd", borderRadius: "10px", fontSize: "14px", outline: "none" }} />
                  <input placeholder="CVV" maxLength={3} type="password" style={{ padding: "12px 14px", border: "1.5px solid #ddd", borderRadius: "10px", fontSize: "14px", outline: "none" }} />
                </div>
                <input placeholder="Name on Card" style={{
                  width: "100%", padding: "12px 14px", border: "1.5px solid #ddd",
                  borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box",
                }} />
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              style={{
                marginTop: "24px", width: "100%",
                background: "linear-gradient(135deg, #725858, #5a3e3e)",
                color: "#fff", border: "none", padding: "14px",
                borderRadius: "10px", cursor: "pointer",
                fontWeight: "700", fontSize: "15px", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.opacity = "0.9"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              🎉 Place Order — ₹{total}
            </button>
          </div>
        )}

        {/* Order Summary Sidebar */}
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "22px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)", position: "sticky", top: "20px",
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2d2d2d", marginBottom: "16px" }}>
            Order Summary
          </h3>
          <div style={{ maxHeight: "220px", overflowY: "auto", marginBottom: "16px" }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "center" }}>
                <img src={item.image} alt={item.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#2d2d2d" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>Qty: {item.quantity} × ₹{item.price}</div>
                </div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#725858" }}>₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #eee", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555" }}>
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#4caf50" }}>
              <span>Discount</span><span>− ₹{discount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555" }}>
              <span>Delivery</span>
              <span style={{ color: delivery === 0 ? "#4caf50" : "#555" }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "700", color: "#2d2d2d", borderTop: "1px solid #eee", paddingTop: "10px" }}>
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}