import AdminLayout from "./AdminLayout";

export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "Midhun",
      email: "midhun@gmail.com",
    },
    {
      id: 2,
      name: "Sachin",
      email: "sachin@gmail.com",
    },
  ];

  return (
    <AdminLayout title="Customers">
      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}