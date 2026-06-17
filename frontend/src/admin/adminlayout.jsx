import Sidebar from "../components/Sidebar";

export default function AdminLayout({
  title,
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "25px",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}