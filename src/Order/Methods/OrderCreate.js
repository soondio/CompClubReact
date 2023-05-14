import React, { useState, useEffect } from "react";
import { Card, DatePicker, message } from "antd";
import moment from "moment";

const IMAGE_DIR = window.location.origin + '/images/';
function CreateOrder() {
  const [computers, setComputers] = useState([]);
  const [selectedComputer, setSelectedComputer] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userId, setUserId] = useState(null);

  const [availableComputers, setAvailableComputers] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch("/api/client");
      const data = await response.json();
      setUserId(data.id);
    };
    fetchClient();
  }, []);

  useEffect(() => {
    const fetchComputers = async () => {
      const response = await fetch("/api/computer");
      const data = await response.json();
      setComputers(data);
    };
    fetchComputers();
  }, []);

  useEffect(() => {
    const fetchAvailableComputers = async () => {
      if (startTime !== "" && endTime !== "") {
        const response = await fetch(
          `/api/availability?date=${startTime}&date2=${endTime}`
        );
        const data = await response.json();
        setAvailableComputers(data);
        console.log(data);
      }
    };
    fetchAvailableComputers();
  }, [startTime, endTime, computers]);



  const handleCardClick = (selectedId) => {
    setSelectedComputer(selectedId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      clientId: userId,
      computerId: selectedComputer,
      startTime,
      endTime,
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (response.status == 400) {
      message.error("Ошибка: недостаточно средств на аккаунте!", 3);
    }
    else {
      const data = await response.json();
      console.log(data);
      setAvailableComputers([]);
      setSelectedComputer("");
      setStartTime("");
      setEndTime("");
      message.success("Заказ успешно создан!", 3);
    }
  };

  return (
    <div>
      <h2>Создание нового заказа</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Дата начала:</label>
          <br />
          <DatePicker
  showTime={{
    defaultValue: moment("00:00", "HH:mm"),
    hideDisabledOptions: true,
  }}
  format="YYYY-MM-DD HH"
  value={startTime ? moment.utc(startTime).utcOffset(+3) : null}
  useUTC={true}
  utcOffset={+3}
  onChange={(date) => setStartTime(date?.toISOString())}
  disabledDate={(currentDate) => currentDate.isBefore(moment().startOf('hour'))}
  disabledTime={(current, type) =>
    type === 'start' &&
    (current &&
      (current.isBefore(moment(), 'minute') ||
        current.isBefore(moment().startOf('hour'))))
  }
/>

        </div>
        <div>
          <label>Дата окончания:</label>
          <br />
          <DatePicker
  showTime={{
    defaultValue: moment("23:00", "HH:mm"),
    hideDisabledOptions: true,
  }}
  format="YYYY-MM-DD HH"
  value={endTime ? moment.utc(endTime).utcOffset(+3) : null}
  onChange={(date) => setEndTime(date?.toISOString())}
  useUTC={true}
  utcOffset={+3}
  disabledDate={(currentDate) =>
    currentDate.isBefore(moment(startTime)) ||
    currentDate.isAfter(moment(startTime).add(1, 'day'))
  }
  disabledTime={(current, type) =>
    type === 'end' &&
    (current &&
      (current.isBefore(moment(startTime).startOf('hour').add(1, 'hour')) ||
        current.isBefore(moment(), 'minute') ||
        current.isAfter(moment(startTime).add(1, 'day').endOf('day'))))
  }
/>


        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {availableComputers.length > 0 ? (
            availableComputers.map((computer) => (
              <Card
                key={computer.id}
                style={{
                  width: 300, margin: "10px",
                  border: selectedComputer === computer.id ? "2px solid #1890ff" : "1px solid #d9d9d9"
                }}
                onClick={() => handleCardClick(computer.id)}
                hoverable={true}
                cover={<img alt="computer" src={IMAGE_DIR + computer.name + '.jpg'} />}
              >
                <Card.Meta
                  title={`Компьютер ${computer.id}`}
                  description={
                    <>
                      <p>Процессор: {computer.processorName}</p>
                      <p>Видеокарта: {computer.videocardName}</p>
                      <p>ОЗУ: {computer.memoryName}</p>
                      <p>Монитор: {computer.monitorName}</p>
                      <p>Цена за час:{computer.pricePerHour}</p>
                    </>
                  }
                />
              </Card>
            ))
          ) : (
            <div>
              <p>Нет доступных компьютеров на указанный период времени.</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!selectedComputer || !startTime || !endTime}
        >
          Забронировать
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;
