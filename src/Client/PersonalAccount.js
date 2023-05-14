import React, { useState, useEffect } from "react";
import { Button } from 'antd';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      // Получение информации о пользователе
      const response = await fetch("/api/Client");
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      // Получение списка заказов пользователя
      if (user) {
        const response = await fetch(`/api/Orders/client/${user.id}`);
        const data = await response.json();
        setOrders(data);
      }
    };
    fetchOrders();
  }, [user]);

  const cancelOrder = async (orderId) => {
    const response = await fetch(`/api/Orders/${orderId}/cancel`, {
      method: 'PUT',
    });
    const data = await response.json();
    if (response.ok) {
      setOrders(orders.map((order) =>
        order.id === orderId ? data : order
      ));
    } else {
      console.log(data.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Balance: {user.balance}</p>
          <p>Bonuses: {user.bonus}</p>
          <h3>Orders:</h3>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <p>Order ID: {order.id}</p>
                  <p>Total Price: {order.totalPrice}</p>
                  <p>Start Time: {order.startTime}</p>
                  <p>End Time: {order.endTime}</p>
                  <p>Status: {order.status}</p>
                  {order.status === 'оформлен' && (
                    <Button onClick={() => cancelOrder(order.id)}>
                      Cancel order
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
