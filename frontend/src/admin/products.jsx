import AdminLayout from "./AdminLayout";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Chain Link Fence",
      price: 1200,
      stock: 50,
    },
    {
      id: 2,
      name: "Barbed Wire",
      price: 800,
      stock: 100,
    },
  ];

  return (
    <AdminLayout title="Products">
      <button
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
        }}
      >
        Add Product
      </button>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}