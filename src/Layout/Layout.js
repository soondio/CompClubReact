import React from "react"
import { Outlet, Link } from "react-router-dom"
const Layout = ({ user }) => {
    return (
        <>
            <div>
                {user.isAuthenticated ? (
                    <h4>Пользователь: {user.userName}</h4>
                ) : (
                    <h4>Пользователь: Гость</h4>
                )}
            </div>
            <nav>
                <Link to="/">Главная</Link> <span> </span>
                <Link to="/orders">Заказы</Link> <span> </span>
                {user.isAuthenticated?(                
                <Link to="/login">Вход</Link>):("")}
                {!user.isAuthenticated?(
                <Link to="/register">Регистрация</Link>):("")}
                {user.isAuthenticated?(
                <Link to="/logoff">Выход</Link>):("")}
                {user.isAuthenticated?(
                <Link to="/client">Личный кабинет</Link>):("")}
                                
            </nav>
            <Outlet />


        </>
    )
}
export default Layout