import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LogIn = ({ user, setUser }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const logIn = async (values) => {
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser({
          isAuthenticated: true,
          userName: data.userName,
          userRole: data.userRole,
        });
        navigate("/");
      } else {
        const data = await response.json();
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user.isAuthenticated ? (
        <h3>{`Пользователь ${user.userName} успешно вошел в систему`}</h3>
      ) : (
        <>
          <h3>Вход</h3>
          <Form name="login-form" onFinish={logIn}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
          {errorMessage && (
            <div style={{ color: "red" }}>{errorMessage}</div>
          )}
        </>
      )}
    </>
  );
};

export default LogIn;

