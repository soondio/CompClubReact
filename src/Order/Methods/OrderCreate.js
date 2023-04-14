import React, { useState} from 'react';

function CreateOrder() {
  const [clientId, setClientId] = useState('');
  const [computerId, setComputerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      clientId,
      computerId,
      startTime,
      endTime,
    };
    const response = await fetch('https://localhost:7043/api/orders', {
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
          <label htmlFor="client-id">ID клиента:</label>
          <input
            type="text"
            id="client-id"
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="computer-id">ID компьютера:</label>
          <input
            type="text"
            id="computer-id"
            value={computerId}
            onChange={(event) => setComputerId(event.target.value)}
          />
        </div>
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
        <button type="submit">Создать заказ</button>
      </form>
    </div>
  );
}

export default CreateOrder;
