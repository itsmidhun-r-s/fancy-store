import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const collections = [
    { name: "Fashion Accessories", emoji: "💍", desc: "Necklaces, earrings, bangles & more", path: "/fashion-accessories" },
    { name: "Hair Accessories", emoji: "✨", desc: "Scrunchies, clips, headbands", path: "/hair-accessories" },
    { name: "Cosmetics", emoji: "💄", desc: "Makeup, kajal, lipstick & more", path: "/cosmetics" },
    { name: "Personal Care", emoji: "🌸", desc: "Perfumes, henna, skincare", path: "/personal-care" },
    { name: "Gifts", emoji: "🎁", desc: "Hampers, clocks, notebooks", path: "/gifts" },
    { name: "Decoratives", emoji: "🏮", desc: "Vases, candles, fairy lights", path: "/decoratives" },
  ];

  const features = [
    { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹999" },
    { icon: "💯", title: "Quality Products", desc: "Handpicked premium items" },
    { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted" },
    { icon: "↩️", title: "Easy Returns", desc: "7-day hassle-free returns" },
  ];

  const testimonials = [
    { name: "Priya S.", review: "Loved the jewellery! Great quality at amazing prices.", rating: 5 },
    { name: "Anitha R.", review: "Fast delivery and beautiful packaging. Will order again!", rating: 5 },
    { name: "Meena K.", review: "The cosmetics kit was perfect for gifting. Highly recommend!", rating: 4 },
  ];

  return (
    <div style={{ fontFamily: "sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{
        height: "92vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", justifyContent: "center", alignItems: "center",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(114,88,88,0.75))" }} />
        <div style={{ position: "relative", color: "white", textAlign: "center", zIndex: 2, padding: "0 20px" }}>
          <p style={{ fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px", opacity: 0.85 }}>
            Welcome to
          </p>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "800", marginBottom: "16px", textShadow: "2px 4px 20px rgba(0,0,0,0.5)", lineHeight: 1.1 }}>
            DAZZLING RARE FANCY
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 22px)", marginBottom: "36px", opacity: 0.9, letterSpacing: "2px" }}>
            Beauty &nbsp;•&nbsp; Style &nbsp;•&nbsp; Elegance
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/products")}
              style={{
                background: "linear-gradient(135deg, #ff9800, #e65100)",
                color: "white", border: "none",
                padding: "15px 40px", borderRadius: "50px",
                fontSize: "17px", fontWeight: "700",
                cursor: "pointer", letterSpacing: "0.5px",
                boxShadow: "0 8px 25px rgba(255,152,0,0.45)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 30px rgba(255,152,0,0.55)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 25px rgba(255,152,0,0.45)"; }}
            >
              Shop Now →
            </button>
            <button
              onClick={() => document.getElementById("collections").scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white", border: "2px solid rgba(255,255,255,0.6)",
                padding: "15px 40px", borderRadius: "50px",
                fontSize: "17px", fontWeight: "600",
                cursor: "pointer", backdropFilter: "blur(4px)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.15)"}
            >
              Explore Collections
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.7)", fontSize: "13px", textAlign: "center" }}>
          <div style={{ animation: "bounce 1.5s infinite" }}>↓</div>
          <div>Scroll</div>
        </div>
      </section>

      {/* ── Features Bar ── */}
      <section style={{ background: "#725858", padding: "20px 40px" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", color: "white" }}>
              <span style={{ fontSize: "26px" }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: "700", fontSize: "14px" }}>{f.title}</div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" style={{ padding: "70px 20px", background: "#fdf8f8" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <p style={{ color: "#725858", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
            What We Offer
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: "800", color: "#2d2d2d", margin: 0 }}>
            Our Collections
          </h2>
          <div style={{ width: "60px", height: "4px", background: "linear-gradient(to right, #725858, #ff9800)", borderRadius: "2px", margin: "14px auto 0" }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px", maxWidth: "1100px", margin: "0 auto",
        }}>
          {collections.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "#fff", borderRadius: "20px",
                padding: "32px 24px", textAlign: "center",
                boxShadow: hoveredCard === i ? "0 16px 40px rgba(114,88,88,0.2)" : "0 4px 16px rgba(0,0,0,0.07)",
                transform: hoveredCard === i ? "translateY(-8px)" : "translateY(0)",
                transition: "all 0.3s ease", cursor: "pointer",
                border: hoveredCard === i ? "2px solid #725858" : "2px solid transparent",
              }}
            >
              <div style={{
                fontSize: "46px", marginBottom: "14px",
                transform: hoveredCard === i ? "scale(1.15)" : "scale(1)",
                transition: "transform 0.3s",
              }}>{item.emoji}</div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#2d2d2d", marginBottom: "8px" }}>
                {item.name}
              </h3>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px", lineHeight: "1.5" }}>
                {item.desc}
              </p>
              <span style={{
                display: "inline-block",
                background: hoveredCard === i ? "#725858" : "#fdf0f0",
                color: hoveredCard === i ? "#fff" : "#725858",
                padding: "6px 18px", borderRadius: "20px",
                fontSize: "13px", fontWeight: "600",
                transition: "all 0.3s",
              }}>
                Shop Now →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Banner Strip ── */}
      <section style={{
        background: "linear-gradient(135deg, #725858, #5a3e3e)",
        padding: "60px 20px", textAlign: "center",
      }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "800", marginBottom: "12px" }}>
          🎉 Special Offer — Free Delivery on Orders above ₹999!
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "28px" }}>
          Shop your favourite accessories, cosmetics & gifts today
        </p>
        <button
          onClick={() => navigate("/products")}
          style={{
            background: "#ff9800", color: "#fff",
            border: "none", padding: "14px 40px",
            borderRadius: "50px", fontSize: "16px", fontWeight: "700",
            cursor: "pointer", transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          Browse All Products
        </button>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: "70px 20px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <p style={{ color: "#725858", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
            Our Promise
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: "800", color: "#2d2d2d", margin: 0 }}>
            Why Choose Us?
          </h2>
          <div style={{ width: "60px", height: "4px", background: "linear-gradient(to right, #725858, #ff9800)", borderRadius: "2px", margin: "14px auto 0" }} />
        </div>
        <p style={{
          maxWidth: "750px", margin: "0 auto 50px",
          fontSize: "17px", lineHeight: "1.9", color: "#666", textAlign: "center",
        }}>
          Discover beautiful jewellery, trendy accessories, gifts, and fashion products
          designed to bring elegance to every occasion. Premium quality at affordable prices.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px", maxWidth: "900px", margin: "0 auto",
        }}>
          {[
            { icon: "⭐", stat: "10,000+", label: "Happy Customers" },
            { icon: "📦", stat: "500+", label: "Products Available" },
            { icon: "🏆", stat: "5 Years", label: "Of Excellence" },
            { icon: "💝", stat: "99%", label: "Satisfaction Rate" },
          ].map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "28px",
              background: "#fdf8f8", borderRadius: "16px",
              border: "1px solid #f0e8e8",
            }}>
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>{s.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#725858", marginBottom: "4px" }}>{s.stat}</div>
              <div style={{ fontSize: "13px", color: "#888" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "70px 20px", background: "#fdf8f8" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <p style={{ color: "#725858", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
            Customer Love
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: "800", color: "#2d2d2d", margin: 0 }}>
            What Our Customers Say
          </h2>
          <div style={{ width: "60px", height: "4px", background: "linear-gradient(to right, #725858, #ff9800)", borderRadius: "2px", margin: "14px auto 0" }} />
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px", maxWidth: "900px", margin: "0 auto",
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "16px",
              padding: "28px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
            }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: s <= t.rating ? "#f0a500" : "#ddd", fontSize: "16px" }}>★</span>
                ))}
              </div>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px", fontStyle: "italic" }}>
                "{t.review}"
              </p>
              <div style={{ fontWeight: "700", color: "#725858", fontSize: "14px" }}>— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #2d1f1f, #725858)",
        padding: "60px 20px", textAlign: "center",
      }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: "800", marginBottom: "12px" }}>
          Ready to Shop?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", marginBottom: "28px" }}>
          Explore our full range of products and find your perfect style
        </p>
        <button
          onClick={() => navigate("/products")}
          style={{
            background: "#fff", color: "#725858",
            border: "none", padding: "14px 44px",
            borderRadius: "50px", fontSize: "16px", fontWeight: "700",
            cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 10px 28px rgba(0,0,0,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)"; }}
        >
          Start Shopping →
        </button>
      </section>

    </div>
  );
}