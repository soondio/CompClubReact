import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import ComputerCard from './ComputerCard';

function ComputerList() {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const fetchComputers = async () => {
      const response = await fetch("/api/computer"); 
      const data = await response.json();
      setComputers(data);
    };
    fetchComputers();
  }, []);

  return (
    <Row justify="center">
      {computers.map(computer => (
        <ComputerCard
          key={computer.id}
          computer={computer}
        />
      ))}
    </Row>
  );
}

export default ComputerList;
