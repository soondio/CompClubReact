import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const LogOff = ({ setUser }) => {
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      title: "Вы уверены что хотите выйти?",
      icon: <ExclamationCircleOutlined />,
      onOk: logOff,
    });
  };

  const logOff = async () => {
    const requestOptions = {
      method: "POST",
    };
    return await fetch("/api/account/logoff", requestOptions).then(
      (response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "" });
        response.status === 401 ? navigate("/login") : navigate("/");
      }
    );
  };

  return (
    <>
      <p></p>
      <button onClick={showConfirm}>Выход</button>
    </>
  );
};

export default LogOff;
