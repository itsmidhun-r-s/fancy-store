export default function About() {
  const features = [
    { icon: "💍", title: "Fashion Accessories", desc: "Trendy jewellery and accessories for every occasion" },
    { icon: "💄", title: "Cosmetics & Makeup", desc: "Premium beauty products at affordable prices" },
    { icon: "🎁", title: "Gifts & Novelties", desc: "Perfect gifts for your loved ones" },
    { icon: "🌸", title: "Personal Care", desc: "Quality personal care and fragrance products" },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #725858, #5a3e3e)",
        padding: "40px 20px",
        textAlign: "center",
      }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(22px, 5vw, 36px)", fontWeight: "800", marginBottom: "12px" }}>
          About Us
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(13px, 3vw, 16px)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>
          Your trusted destination for fashion, beauty & lifestyle
        </p>
      </div>

      {/* Mission */}
      <div style={{ padding: "30px 16px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{
          background: "#fff", borderRadius: "16px",
          padding: "24px", marginBottom: "20px",
          boxShadow: "0 4px 16px rgba(114,88,88,0.1)",
          width: "100%",
        }}>
          <h2 style={{ color: "#725858", fontSize: "clamp(18px, 4vw, 24px)", fontWeight: "700", marginBottom: "12px" }}>
            🎯 Our Mission
          </h2>
          <p style={{ color: "#555", lineHeight: "1.8", fontSize: "clamp(13px, 3vw, 15px)" }}>
            Our mission is to deliver stylish, affordable, and high-quality products
            while ensuring a smooth shopping experience for every customer.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "14px",
              padding: "18px 14px", textAlign: "center",
              boxShadow: "0 4px 12px rgba(114,88,88,0.08)",
            }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{f.icon}</div>
              <h3 style={{ color: "#725858", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>
                {f.title}
              </h3>
              <p style={{ color: "#888", fontSize: "12px", lineHeight: "1.5" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}>
          {[
            { value: "10K+", label: "Customers" },
            { value: "500+", label: "Products" },
            { value: "99%", label: "Satisfaction" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, #725858, #5a3e3e)",
              borderRadius: "12px", padding: "16px 8px",
              textAlign: "center",
            }}>
              <div style={{ color: "#ff9800", fontSize: "clamp(18px, 4vw, 24px)", fontWeight: "800" }}>
                {s.value}
              </div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Strip */}
      <div style={{
        background: "#fdf8f8",
        padding: "24px 16px",
        textAlign: "center",
        borderTop: "1px solid #f0e8e8",
      }}>
        <h3 style={{ color: "#725858", marginBottom: "16px", fontSize: "16px" }}>Get In Touch</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
          <p style={{ color: "#666", fontSize: "14px" }}>📞 +91 9876543210</p>
          <p style={{ color: "#666", fontSize: "14px" }}>✉️ info@dazzlingrarefancy.com</p>
          <p style={{ color: "#666", fontSize: "14px" }}>📍 Tamil Nadu, India</p>
        </div>
      </div>
    </div>
  );
}