import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    footer: {
      background: "#1f2937",
      color: "#fff",
      marginTop: "20px",
      width: "100%",
      overflowX: "hidden",
    },

    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: isMobile ? "25px 15px" : "35px 20px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
      gap: isMobile ? "22px" : "35px",
      boxSizing: "border-box",
    },

    section: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    heading: {
      marginBottom: "12px",
      fontSize: isMobile ? "15px" : "17px",
      fontWeight: "bold",
      wordBreak: "break-word",
    },

    subHeading: {
      marginBottom: "10px",
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
    },

    text: {
      color: "#d1d5db",
      lineHeight: "1.7",
      fontSize: isMobile ? "14px" : "16px",
      margin: "0 0 8px 0",
      wordBreak: "break-word",
    },

    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },

    li: {
      marginBottom: "8px",
    },

    link: {
      textDecoration: "none",
      color: "#d1d5db",
      fontSize: isMobile ? "14px" : "16px",
    },

    socialIcons: {
      display: "flex",
      flexDirection: "row",
      gap: "16px",
      fontSize: "22px",
      marginTop: "8px",
      flexWrap: "wrap",
    },

    socialLink: {
      color: "#fff",
      textDecoration: "none",
    },

    bottom: {
      borderTop: "1px solid #374151",
      textAlign: "center",
      padding: isMobile ? "15px 10px" : "20px",
      color: "#d1d5db",
      fontSize: isMobile ? "14px" : "16px",
      boxSizing: "border-box",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.heading}>
            🇩​🇦​🇿​🇿​🇱​🇮​🇳​🇬 🇷​🇦​🇷​🇪​ 🇫​🇦​🇳​🇨​🇾
          </h2>

          <p style={styles.text}>
            Your trusted online shopping destination for quality products at
            affordable prices.
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.subHeading}>Quick Links</h3>

          <ul style={styles.ul}>
            <li style={styles.li}>
              <a href="/" style={styles.link}>Home</a>
            </li>

            <li style={styles.li}>
              <a href="/products" style={styles.link}>Products</a>
            </li>

            <li style={styles.li}>
              <a href="/contact" style={styles.link}>Contact</a>
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3 style={styles.subHeading}>Contact Us</h3>

          <p style={styles.text}>
            <FaPhone /> +91 9876543210
          </p>

          <p style={styles.text}>
            <FaEnvelope /> info@fancystore.com
          </p>

          <p style={styles.text}>
            <FaMapMarkerAlt /> Tamil Nadu, India
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.subHeading}>Follow Us</h3>

          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}><FaFacebook /></a>
            <a href="#" style={styles.socialLink}><FaInstagram /></a>
            <a href="#" style={styles.socialLink}><FaTwitter /></a>
            <a href="#" style={styles.socialLink}><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} Fancy Store. All Rights Reserved.
      </div>
    </footer>
  );
}