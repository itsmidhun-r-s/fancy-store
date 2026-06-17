export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#725858",
        padding: "60px 20px",
        color: "white",
      }}
    >
      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            fontWeight: "bold",
            marginBottom: "20px",
            letterSpacing: "2px",
          }}
        >
          About Fancy Store
        </h1>

        <p
          style={{
            maxWidth: "900px",
            margin: "auto",
            fontSize: "20px",
            lineHeight: "1.8",
            color: "#f5f5f5",
          }}
        >
          Welcome to Fancy Store, your trusted destination for
          elegant jewellery, fashion accessories, gifts, and
          premium fancy products. We are committed to providing
          quality products with excellent customer service.
        </p>
      </div>

      {/* Mission & Vision */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "500px",
            background: "white",
            color: "#333",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              color: "#725858",
              marginBottom: "15px",
            }}
          >
            🎯 Our Mission
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            Our mission is to deliver stylish, affordable, and
            high-quality products while ensuring a smooth and
            enjoyable shopping experience for every customer.
          </p>
        </div>

        <div
          style={{
            width: "500px",
            background: "white",
            color: "#333",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              color: "#725858",
              marginBottom: "15px",
            }}
          >
            👁️ Our Vision
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            To become one of the most trusted and loved online
            stores by offering unique collections, exceptional
            service, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          background: "white",
          color: "#333",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#725858",
            marginBottom: "30px",
          }}
        >
          ⭐ Why Choose Us?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>🛍️</h1>
            <h3>Quality Products</h3>
          </div>

          <div style={{ textAlign: "center" }}>
            <h1>🚚</h1>
            <h3>Fast Delivery</h3>
          </div>

          <div style={{ textAlign: "center" }}>
            <h1>💳</h1>
            <h3>Secure Payment</h3>
          </div>

          <div style={{ textAlign: "center" }}>
            <h1>❤️</h1>
            <h3>Customer Support</h3>
          </div>
        </div>
      </div>
    </div>
  );
}