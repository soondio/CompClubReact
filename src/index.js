import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client"
import Order from './Order/Order'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OrderCreate from './Order/Methods/OrderCreate'
import Layout from "./Layout/Layout"
import LogIn from "./LogIn/LogIn"
import LogOff from "./LogOff/LogOff"
import Register from './Register/Register'

const App = () => {
    const [orders, setOrders] = useState([])
    const addOrder = (order) => setOrders([...orders, order])
    const removeOrder = (removeId) => setOrders(orders.filter(({ id }) => id
        !== removeId));
        const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" });
        useEffect(() => {
      
      
          const getUser = async () => {
            return await fetch("/api/Account/IsAuthenticated")
              .then((response) => {
                response.status === 401 &&
                  setUser({ isAuthenticated: false, userName: "" });
                return response.json;
              })
              .then(
                (data) => {
                  if (
                    typeof data != "undefined" &&
                    typeof data.userName != "undefined"
                  ) {
                    setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole });
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
          };
          getUser();
        }, [setUser]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user} />}>
                    <Route index element={<h3>Главная страница</h3>} />
                    <Route
                        path="/orders"
                        element={
                            <>

                                <OrderCreate
                                    addOrder={addOrder}
                                />

                                <Order
                                    user={user}
                                    Orders={orders}
                                    setOrders={setOrders}
                                    removeOrder={removeOrder}
                                />
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={<LogIn user={user} setUser={setUser} />}
                    />
                    <Route path="/logoff" element={<LogOff setUser={setUser} />} />
                    <Route path="/register" element={<Register setUser={setUser} />} />
                    <Route path="*" element={<h3>404</h3>} />
                </Route>
            </Routes>
        </BrowserRouter>)
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)

