import React, { useState } from 'react';
import { Card, Modal } from 'antd';

const IMAGE_DIR = window.location.origin + '/images/';

const ComputerCard = ({ computer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div onClick={toggleExpanded}>
      {isExpanded ? (
        <Modal 
          title={computer.name}
          centered
          visible={isExpanded}
          onCancel={toggleExpanded}
          width={600}
          footer={null}
        >
          <div style={{ display: 'flex' }}>
            <img
              alt="computer"
              src={IMAGE_DIR + computer.name + '.jpg'}
              style={{ marginRight: '20px' }}
              width={200}
            />
            <div>
              <p>
                Процессор: {computer.processorName} <br />
                Видеокарта: {computer.videocardName} <br />
                ОЗУ: {computer.memoryName} <br />
                Монитор: {computer.monitorName}<br />
                Цена за час: {computer.pricePerHour}
              </p>
            </div>
          </div>
        </Modal>
      ) : (
        <Card 
          hoverable
          style={{ width: 240, margin: '10px' }}
          cover={<img alt="computer" src={IMAGE_DIR+computer.name+'.jpg'} />}
        >
          <Card.Meta title={computer.name} />
        </Card>
      )}
    </div>
  );
};

export default ComputerCard;
