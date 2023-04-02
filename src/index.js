import React, { useState } from 'react'
import ReactDOM from "react-dom/client"
import Order from './Order/Order'
import OrderCreate from './Order/Methods/OrderCreate'
const App = () => {
    const [orders, setOrders] = useState([])
    const addOrder=(order)=>setOrders([...orders,order])
    const removeOrder = (removeId) => setOrders(orders.filter(({ id }) => id
!== removeId));
    return (
        <div>
            <OrderCreate
            addOrder={addOrder}
        />
        
            <Order
                Orders={orders}
                setOrders={setOrders}
                removeOrder={removeOrder}
            />
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)

