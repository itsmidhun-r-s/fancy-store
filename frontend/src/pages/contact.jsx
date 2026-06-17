import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "20px",
    },

    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#1e293b",
    },

    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
    },

    card: {
      background: "#fff",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "16px",
    },

    textarea: {
      width: "100%",
      padding: "12px",
      minHeight: "120px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      resize: "vertical",
    },

    button: {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },

    infoTitle: {
      marginBottom: "15px",
      color: "#1e293b",
    },

    info: {
      marginBottom: "15px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>

      <div style={styles.wrapper}>
        {/* Contact Form */}
        <div style={styles.card}>
          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              required
            />

            <button
              type="submit"
              style={styles.button}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div style={styles.card}>
          <h2 style={styles.infoTitle}>
            Store Information
          </h2>

          <p style={styles.info}>
            <strong>Store Name:</strong>
            {" "}🇩​🇦​🇿​🇿​🇱​🇮​🇳​🇬​ 🇷​🇦​🇷​🇪​ 🇫​🇦​🇳​🇨​🇾
          </p>

          <p style={styles.info}>
            <strong>Address:</strong>
            {" "}123 Main Road, Chennai,
            Tamil Nadu, India
          </p>

          <p style={styles.info}>
            <strong>Phone:</strong>
            {" "}+91 9876543210
          </p>

          <p style={styles.info}>
            <strong>Email:</strong>
            {" "}info@fancystore.com
          </p>

          <p style={styles.info}>
            <strong>Working Hours:</strong>
            {" "}9:00 AM - 8:00 PM
          </p>

          <iframe
            title="map"
            width="100%"
            height="250"
            style={{
              border: 0,
              borderRadius: "10px",
            }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    </div>
  );
}