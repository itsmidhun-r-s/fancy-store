import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Sample data
  const [orders] = useState([
    { id: "#ORD001", customer: "Priya S.", product: "Oxidized Silver Necklace", qty: 2, amount: 598, status: "Delivered", date: "12 Jun 2026" },
    { id: "#ORD002", customer: "Anitha R.", product: "Kajal Eyeliner", qty: 1, amount: 149, status: "Processing", date: "13 Jun 2026" },
    { id: "#ORD003", customer: "Meena K.", product: "Gift Hamper Box", qty: 1, amount: 999, status: "Shipped", date: "14 Jun 2026" },
    { id: "#ORD004", customer: "Lakshmi P.", product: "Scrunchie Set", qty: 3, amount: 447, status: "Processing", date: "14 Jun 2026" },
    { id: "#ORD005", customer: "Divya M.", product: "Lipstick Set", qty: 1, amount: 499, status: "Cancelled", date: "15 Jun 2026" },
  ]);

  const [stocks] = useState([
    { id: 1, name: "Oxidized Silver Necklace", category: "Fashion", price: 299, stock: 45, status: "In Stock" },
    { id: 2, name: "Kajal Eyeliner", category: "Cosmetics", price: 149, stock: 8, status: "Low Stock" },
    { id: 3, name: "Scrunchie Set (5 Pack)", category: "Hair", price: 149, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Gift Hamper Box", category: "Gifts", price: 999, stock: 22, status: "In Stock" },
    { id: 5, name: "Lipstick Set", category: "Cosmetics", price: 499, stock: 5, status: "Low Stock" },
    { id: 6, name: "Ceramic Vase Set", category: "Decoratives", price: 599, stock: 18, status: "In Stock" },
    { id: 7, name: "Henna Cone Set", category: "Personal Care", price: 199, stock: 0, status: "Out of Stock" },
    { id: 8, name: "Pearl Hairpins", category: "Hair", price: 129, stock: 60, status: "In Stock" },
  ]);

  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const statusColor = (status) => {
    if (status === "Delivered") return { bg: "#e8f5e9", color: "#2e7d32" };
    if (status === "Shipped") return { bg: "#e3f2fd", color: "#1565c0" };
    if (status === "Processing") return { bg: "#fff8e1", color: "#f57f17" };
    if (status === "Cancelled") return { bg: "#fce4ec", color: "#c62828" };
    return { bg: "#f5f5f5", color: "#555" };
  };

  const stockColor = (status) => {
    if (status === "In Stock") return { bg: "#e8f5e9", color: "#2e7d32" };
    if (status === "Low Stock") return { bg: "#fff8e1", color: "#f57f17" };
    if (status === "Out of Stock") return { bg: "#fce4ec", color: "#c62828" };
    return {};
  };

  const totalRevenue = orders.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.amount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Processing").length;
  const lowStockItems = stocks.filter(s => s.status !== "In Stock").length;

  const navItems = [
    { key: "overview", label: "📊 Overview" },
    { key: "orders", label: "📦 Orders" },
    { key: "stocks", label: "🏪 Stock" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f0f0" }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: "220px", background: "linear-gradient(180deg, #725858, #3d2c2c)",
        display: "flex", flexDirection: "column", position: "fixed",
        top: 0, left: 0, bottom: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", letterSpacing: "2px", marginBottom: "4px" }}>
            ADMIN PANEL
          </div>
          <div style={{ color: "#fff", fontWeight: "800", fontSize: "15px" }}>
            ✨ Dazzling Rare Fancy
          </div>
        </div>

        {/* Admin Info */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", marginBottom: "8px",
          }}>👤</div>
          <div style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{user.name}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>{user.email}</div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                width: "100%", textAlign: "left",
                padding: "11px 14px", borderRadius: "10px",
                border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: "600",
                marginBottom: "4px",
                background: activeTab === item.key ? "rgba(255,255,255,0.2)" : "transparent",
                color: activeTab === item.key ? "#fff" : "rgba(255,255,255,0.65)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { if (activeTab !== item.key) e.target.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { if (activeTab !== item.key) e.target.style.background = "transparent"; }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Store Link + Logout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={() => navigate("/")} style={{
            width: "100%", textAlign: "left", padding: "10px 14px",
            borderRadius: "10px", border: "none", cursor: "pointer",
            fontSize: "13px", color: "rgba(255,255,255,0.65)",
            background: "transparent", marginBottom: "6px",
          }}>🏠 View Store</button>
          <button onClick={handleLogout} style={{
            width: "100%", textAlign: "left", padding: "10px 14px",
            borderRadius: "10px", border: "none", cursor: "pointer",
            fontSize: "13px", color: "#ff8a80", background: "transparent",
          }}>🚪 Logout</button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ marginLeft: "220px", flex: 1, padding: "30px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#2d2d2d", margin: "0 0 4px" }}>
            {activeTab === "overview" ? "📊 Dashboard Overview" :
             activeTab === "orders" ? "📦 Orders Management" : "🏪 Stock Management"}
          </h1>
          <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
            Welcome back, {user.name}! Here's what's happening today.
          </p>
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px", marginBottom: "30px",
            }}>
              {[
                { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "💰", color: "#725858", bg: "#fdf8f8" },
                { label: "Total Orders", value: totalOrders, icon: "📦", color: "#1565c0", bg: "#e3f2fd" },
                { label: "Pending Orders", value: pendingOrders, icon: "⏳", color: "#f57f17", bg: "#fff8e1" },
                { label: "Stock Alerts", value: lowStockItems, icon: "⚠️", color: "#c62828", bg: "#fce4ec" },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: "16px", padding: "22px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  borderLeft: `4px solid ${stat.color}`,
                }}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{stat.icon}</div>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: stat.color, marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "13px", color: "#888", fontWeight: "500" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#2d2d2d", margin: 0 }}>Recent Orders</h2>
                <button onClick={() => setActiveTab("orders")} style={{
                  background: "#fdf8f8", color: "#725858", border: "1px solid #e0c8c8",
                  padding: "6px 14px", borderRadius: "8px", cursor: "pointer",
                  fontSize: "13px", fontWeight: "600",
                }}>View All</button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f5f5f5" }}>
                    {["Order ID", "Customer", "Product", "Amount", "Status"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: "12px", color: "#888", fontWeight: "600", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 4).map((order) => {
                    const s = statusColor(order.status);
                    return (
                      <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                        <td style={{ padding: "12px", fontSize: "13px", fontWeight: "700", color: "#725858" }}>{order.id}</td>
                        <td style={{ padding: "12px", fontSize: "13px", color: "#2d2d2d" }}>{order.customer}</td>
                        <td style={{ padding: "12px", fontSize: "13px", color: "#555" }}>{order.product}</td>
                        <td style={{ padding: "12px", fontSize: "13px", fontWeight: "700", color: "#2d2d2d" }}>₹{order.amount}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ background: s.bg, color: s.color, padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stock Alerts */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#2d2d2d", margin: 0 }}>⚠️ Stock Alerts</h2>
                <button onClick={() => setActiveTab("stocks")} style={{
                  background: "#fdf8f8", color: "#725858", border: "1px solid #e0c8c8",
                  padding: "6px 14px", borderRadius: "8px", cursor: "pointer",
                  fontSize: "13px", fontWeight: "600",
                }}>View All</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {stocks.filter(s => s.status !== "In Stock").map((item) => {
                  const sc = stockColor(item.status);
                  return (
                    <div key={item.id} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: "10px",
                      background: sc.bg, border: `1px solid ${sc.color}22`,
                    }}>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "14px", color: "#2d2d2d" }}>{item.name}</div>
                        <div style={{ fontSize: "12px", color: "#888" }}>{item.category}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "13px", color: "#555" }}>Stock: <strong>{item.stock}</strong></span>
                        <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}44`, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── Orders Tab ── */}
        {activeTab === "orders" && (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d", marginBottom: "20px" }}>
              All Orders ({orders.length})
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
                <thead>
                  <tr style={{ background: "#fdf8f8", borderRadius: "10px" }}>
                    {["Order ID", "Customer", "Product", "Qty", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontSize: "12px", color: "#725858", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const s = statusColor(order.status);
                    return (
                      <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#fdf8f8"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px", fontSize: "13px", fontWeight: "700", color: "#725858" }}>{order.id}</td>
                        <td style={{ padding: "14px", fontSize: "13px", color: "#2d2d2d", fontWeight: "500" }}>{order.customer}</td>
                        <td style={{ padding: "14px", fontSize: "13px", color: "#555" }}>{order.product}</td>
                        <td style={{ padding: "14px", fontSize: "13px", color: "#555", textAlign: "center" }}>{order.qty}</td>
                        <td style={{ padding: "14px", fontSize: "14px", fontWeight: "700", color: "#2d2d2d" }}>₹{order.amount}</td>
                        <td style={{ padding: "14px" }}>
                          <span style={{ background: s.bg, color: s.color, padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px", fontSize: "12px", color: "#888" }}>{order.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px", marginTop: "24px",
            }}>
              {[
                { label: "Total Revenue", value: `₹${totalRevenue}`, color: "#725858" },
                { label: "Delivered", value: orders.filter(o => o.status === "Delivered").length, color: "#2e7d32" },
                { label: "Processing", value: orders.filter(o => o.status === "Processing").length, color: "#f57f17" },
                { label: "Shipped", value: orders.filter(o => o.status === "Shipped").length, color: "#1565c0" },
                { label: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length, color: "#c62828" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "#fdf8f8", borderRadius: "12px", padding: "14px",
                  textAlign: "center", border: "1px solid #f0e8e8",
                }}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Stocks Tab ── */}
        {activeTab === "stocks" && (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#2d2d2d", marginBottom: "20px" }}>
              Stock Management ({stocks.length} products)
            </h2>

            {/* Stock Summary */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px", marginBottom: "24px",
            }}>
              {[
                { label: "Total Products", value: stocks.length, color: "#725858", bg: "#fdf8f8" },
                { label: "In Stock", value: stocks.filter(s => s.status === "In Stock").length, color: "#2e7d32", bg: "#e8f5e9" },
                { label: "Low Stock", value: stocks.filter(s => s.status === "Low Stock").length, color: "#f57f17", bg: "#fff8e1" },
                { label: "Out of Stock", value: stocks.filter(s => s.status === "Out of Stock").length, color: "#c62828", bg: "#fce4ec" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: s.bg, borderRadius: "12px", padding: "16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ background: "#fdf8f8" }}>
                    {["#", "Product Name", "Category", "Price", "Stock Qty", "Status"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontSize: "12px", color: "#725858", fontWeight: "700", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((item) => {
                    const sc = stockColor(item.status);
                    return (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f5f5f5" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#fdf8f8"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px", fontSize: "13px", color: "#888" }}>{item.id}</td>
                        <td style={{ padding: "14px", fontSize: "14px", fontWeight: "600", color: "#2d2d2d" }}>{item.name}</td>
                        <td style={{ padding: "14px" }}>
                          <span style={{ background: "#f5f0f0", color: "#725858", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {item.category}
                          </span>
                        </td>
                        <td style={{ padding: "14px", fontSize: "14px", fontWeight: "700", color: "#725858" }}>₹{item.price}</td>
                        <td style={{ padding: "14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{
                              fontSize: "15px", fontWeight: "700",
                              color: item.stock === 0 ? "#c62828" : item.stock < 10 ? "#f57f17" : "#2e7d32",
                            }}>{item.stock}</span>
                            {/* Mini stock bar */}
                            <div style={{ flex: 1, height: "6px", background: "#f0f0f0", borderRadius: "3px", maxWidth: "80px" }}>
                              <div style={{
                                height: "100%", borderRadius: "3px",
                                width: `${Math.min(100, (item.stock / 60) * 100)}%`,
                                background: item.stock === 0 ? "#e85d5d" : item.stock < 10 ? "#f0a500" : "#4caf50",
                                transition: "width 0.3s",
                              }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px" }}>
                          <span style={{ background: sc.bg, color: sc.color, padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}