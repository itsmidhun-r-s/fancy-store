export default function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>My Profile</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          maxWidth: "500px",
        }}
      >
        <p>
          <strong>Name:</strong> John Doe
        </p>

        <p>
          <strong>Email:</strong> john@example.com
        </p>

        <p>
          <strong>Phone:</strong> 9876543210
        </p>

        <button>
          Edit Profile
        </button>
      </div>
    </div>
  );
}