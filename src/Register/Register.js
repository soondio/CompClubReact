import React from "react"
import {useNavigate} from "react-router-dom"

const Register = ({setUser})=>{
    const navigate = useNavigate();
    const handleSubmit =(e)=>{
        e.preventDefault();

        const login = e.target.elements.loginField.value;
        const password = e.target.elements.passwordField.value;
        const passwordConfirm = e.target.elements.passwordCheckField.value;
        console.log(e.target.elements);
        const newUser = {
            email: login,
            password:password,
            passwordConfirm:passwordConfirm,
        };

        const createUser = async ()=>{
            console.log(newUser);
            const requestOptions ={
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(newUser),
            };

            const response = await fetch("/api/account/register",requestOptions);
            return await response.json().then(
                (data)=>{
                    console.log(data);

                    if (response.ok){
                        setUser({IsAuthenticated:true, userName:newUser.email});
                        navigate("/");
                    }
                },
                (error)=>console.log(error)
            );
        };
        createUser();
    };

    return (
        <React.Fragment>
            <h3>Регистрация</h3>
            <form onSubmit={handleSubmit}>
                <label>Логин: </label>
                <input type="text" name="loginField"/>
                <br />
                <label>Пароль: </label>
                <input type="text" name="passwordField"/>
                <br />
                <label>Повторите пароль: </label>
                <input type="text" name="passwordCheckField"/>
                <br />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </React.Fragment>
    );
};

export default Register;