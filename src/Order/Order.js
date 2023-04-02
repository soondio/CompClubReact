import React, { useEffect } from 'react'
import './Style.css'
const Order = ({ Orders, setOrders,removeOrder }) => {
    useEffect(() => {
        const GetOrder = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("https://localhost:7043/api/Orders/",

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
        method: 'DELETE'
        }
        return await fetch(`https://localhost:7043/api/Orders/${id}`,
        requestOptions)
        
        .then((response) => {
        if (response.ok) {
        removeOrder(id);
        }
        },
        (error) => console.log(error)
        )
        }

    return (
        <React.Fragment>
    <h3>Список заказов</h3>
    {Orders.map(({ id, client,computerId }) => (
        <div className="Order" key={id} id={id}>
            <strong>Заказ №{id} совершил клиент:</strong>
            <button onClick={(e) => deleteItem({ id})}>Удалить</button>
            {client ? (
                <div className="ClientInfo">
                    <strong>{client.name}, email: {client.email}</strong>
                </div>
            ) : (
                <div>Клиент не указан</div>
            )}
            <strong> клиент находился за компьютером №{computerId}</strong>
        </div>
    ))}
</React.Fragment>
    )
}
export default Order