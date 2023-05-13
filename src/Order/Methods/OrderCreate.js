import React, { useState, useEffect } from 'react';

function CreateOrder() {
  const [computers, setComputers] = useState([]);
  const [selectedComputer, setSelectedComputer] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userId, setUserId] = useState(null);
  const [selectedComputerDetails, setSelectedComputerDetails] = useState({});
  const [availableComputers, setAvailableComputers] = useState([]);


  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch('/api/client');
      const data = await response.json();
      setUserId(data.id);
    };
    fetchClient();
  }, []);

  useEffect(() => {
    const fetchComputers = async () => {
      const response = await fetch('/api/computer');
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

  useEffect(() => {
    const fetchSelectedComputerDetails = async () => {
      if (selectedComputer !== null) {
        const response = await fetch(`/api/computer/${selectedComputer}`);
        const data = await response.json();
        setSelectedComputerDetails(data);
      }
    };
    fetchSelectedComputerDetails();
  }, [selectedComputer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      clientId: userId,
      computerId: selectedComputer,
      startTime,
      endTime,
    };
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    console.log(data);
  };
  

  return (
    <div>
      <h2>Создание нового заказа</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="start-time">Дата начала:</label>
          <input
            type="datetime-local"
            id="start-time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end-time">Дата окончания:</label>
          <input
            type="datetime-local"
            id="end-time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </div>
        {availableComputers.length > 0 ? (
          <div>
            <label htmlFor="computer">Выберите компьютер:</label>
            <select
              id="computer"
              value={selectedComputer}
              onChange={(event) => setSelectedComputer(event.target.value)}
            >
              <option value="" disabled>
                --Выберите компьютер--
              </option>
              {availableComputers.map((computer) => (
                <option key={computer.id} value={computer.id}>
                  {computer.id}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <p>Нет доступных компьютеров на указанный период времени.</p>
          </div>
        )}
        {selectedComputer !== "" && (
          <div>
            <h3>Характеристики компьютера:</h3>
            <ul>
              <li>Процессор: {selectedComputerDetails.processorName}</li>
              <li>Видеокарта: {selectedComputerDetails.videocardName}</li>
              <li>ОЗУ: {selectedComputerDetails.memoryName}</li>
              <li>Монитор: {selectedComputerDetails.monitorName}</li>
            </ul>
          </div>
        )}
        <button type="submit" disabled={!selectedComputer || !startTime || !endTime}>
          Забронировать
        </button>
      </form>
    </div>
  );




}

export default CreateOrder;
