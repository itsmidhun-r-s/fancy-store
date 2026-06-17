import AdminLayout from "./AdminLayout";

export default function Categories() {
  const categories = [
    "Fencing",
    "Wire",
    "Gates",
    "Accessories",
  ];

  return (
    <AdminLayout title="Categories">
      <button
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
        }}
      >
        Add Category
      </button>

      {categories.map((category) => (
        <div
          key={category}
          style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          {category}
        </div>
      ))}
    </AdminLayout>
  );
}