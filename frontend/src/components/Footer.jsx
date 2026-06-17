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
  const styles = {
    footer: {
      background: "#1f2937",
      color: "#fff",
      marginTop: "20px",
    },

    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "30px 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    },

    section: {
      display: "flex",
      flexDirection: "column",
    },

    heading: {
      marginBottom: "15px",
      fontSize: "22px",
    },

    subHeading: {
      marginBottom: "15px",
      fontSize: "18px",
    },

    text: {
      color: "#d1d5db",
      lineHeight: "1.7",
    },

    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },

    li: {
      marginBottom: "10px",
    },

    link: {
      textDecoration: "none",
      color: "#d1d5db",
    },

    socialIcons: {
      display: "flex",
      gap: "15px",
      fontSize: "22px",
      marginTop: "10px",
    },

    socialLink: {
      color: "#fff",
      textDecoration: "none",
    },

    bottom: {
      borderTop: "1px solid #374151",
      textAlign: "center",
      padding: "20px",
      color: "#d1d5db",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Company Info */}
        <div style={styles.section}>
          <h2 style={styles.heading}>🇩​🇦​🇿​🇿​🇱​🇮​🇳​🇬 🇷​🇦​🇷​🇪​ 🇫​🇦​🇳​🇨​🇾</h2>
          <p style={styles.text}>
            Your trusted online shopping destination
            for quality products at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h3 style={styles.subHeading}>Quick Links</h3>

          <ul style={styles.ul}>
            <li style={styles.li}>
              <a href="/" style={styles.link}>
                Home
              </a>
            </li>

            <li style={styles.li}>
              <a href="/products" style={styles.link}>
                Products
              </a>
            </li>

            <li style={styles.li}>
              <a href="/contact" style={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
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

        {/* Social Media */}
        <div style={styles.section}>
          <h3 style={styles.subHeading}>Follow Us</h3>

          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}>
              <FaFacebook />
            </a>

            <a href="#" style={styles.socialLink}>
              <FaInstagram />
            </a>

            <a href="#" style={styles.socialLink}>
              <FaTwitter />
            </a>

            <a href="#" style={styles.socialLink}>
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Fancy Store.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}