import { useEffect, useState } from "react";
import Layout from "/components/Layout";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => setOrders(response.data));
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>
      <table class="basic">
        <thead>
          <th>Date</th>
          <th>Paid</th>
          <th>Recipient</th>
          <th>Products</th>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city} {order.postalCode} {order.country} <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data.product_data.name} = $
                      {l.price_data.unit_amount / 100} X {l.quantity} <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrdersPage;
