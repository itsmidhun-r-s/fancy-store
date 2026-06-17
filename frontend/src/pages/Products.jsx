import { Link } from "react-router-dom";

import fashion from "../assets/fashion accessories.webp";
import hair from "../assets/hair accessories.jpg";
import essentials from "../assets/everyday essential.avif";
import cosmetics from "../assets/cosmetics.webp";
import personalcare from "../assets/personalcare.avif";
import gifts from "../assets/gifts.webp";
import decoratives from "../assets/decoratives.jpg";

const categories = [
  { name: "Fashion Accessories", image: fashion, path: "/fashion-accessories" },
  { name: "Hair Accessories", image: hair, path: "/hair-accessories" },
  { name: "Everyday Essentials", image: essentials, path: "/everyday-essentials" },
  { name: "Cosmetics & Makeup", image: cosmetics, path: "/cosmetics" },
  { name: "Personal Care", image: personalcare, path: "/personal-care" },
  { name: "Gifts & Novelties", image: gifts, path: "/gifts" },
  { name: "Decoratives", image: decoratives, path: "/decoratives" },
];

export default function ProductCategories() {
  return (
    <div style={{ minHeight: "100vh", background: "#725858", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", color: "white", marginBottom: "40px", fontSize: "2rem" }}>
        Product Categories
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px", maxWidth: "1200px", margin: "0 auto",
      }}>
        {categories.map((category) => (
          <div key={category.name} style={{
            borderRadius: "15px", overflow: "hidden",
            position: "relative", height: "300px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}>
            <img src={category.image} alt={category.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
              padding: "30px 20px 20px", textAlign: "center",
            }}>
              <h2 style={{ color: "#fff", marginBottom: "12px", fontSize: "1.1rem" }}>
                {category.name}
              </h2>
              <Link to={category.path}>
                <button style={{
                  background: "#7b5d5d", color: "#fff", border: "none",
                  padding: "10px 24px", borderRadius: "8px", cursor: "pointer",
                  fontWeight: "600", fontSize: "14px",
                  transition: "background 0.2s, transform 0.15s",
                }}
                  onMouseEnter={(e) => { e.target.style.background = "#5a3e3e"; e.target.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "#7b5d5d"; e.target.style.transform = "scale(1)"; }}
                >
                  View Products
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}