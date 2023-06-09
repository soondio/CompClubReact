import React, { useEffect } from 'react';
import './Style.css';

const Order = ({ Orders, setOrders,removeOrder,user }) => {
  useEffect(() => {
      const GetOrder = async () => {
          const requestOptions = {
              method: 'GET'
          }
          return await fetch("api/Orders/",

              requestOptions)

              .then(response => response.json())
              .then(
                  (data) => {
                      console.log('Data:', data)
                      setOrders(data)
                  },
                  (error) => {
                      console.log(error)
                  }
              )
      }
      GetOrder()
  }, [setOrders])

  const deleteItem = async ({ id }) => {
    const requestOptions = {
      method: 'DELETE',
    };
    return await fetch(`/api/Orders/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          removeOrder(id);
        }
      },
      (error) => console.log(error)
    );
  };

  return (
    <React.Fragment>
      {user.userRole === "admin" ? (
        <div>
          <h3>Список заказов</h3>
          {Orders.map(({ id, client, computerId, startTime, endTime,status }) => (
            <div className="Order" key={id} id={id}>
              <strong>Заказ №{id} совершил клиент:</strong>
              <button onClick={() => deleteItem({ id })}>Удалить</button>
              {client ? (
                <div className="ClientInfo">
                  <strong>{client.name}, email: {client.email}</strong>
                </div>
              ) : (
                <div>Клиент не указан</div>
              )}
              <strong> клиент находился за компьютером №{computerId}</strong>
              <div>Дата начала: {new Date(startTime).toLocaleString()}</div>
              <div>Дата окончания: {new Date(endTime).toLocaleString()}</div>
              <strong>Статус заказа: {status}</strong>
            </div>
          ))}
        </div>
      ) : (
          ""
        )}
    </React.Fragment>
  );
};
export default Order;
