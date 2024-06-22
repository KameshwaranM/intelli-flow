// ModalContent.js
import React, { useState } from 'react';

const ModalContent = ({ isOpen, onClose, onAddField }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('');

  const handleAddField = () => {
    if (label && type) {
      onAddField(label, type);
      setLabel('');
      setType('');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Field</h2>
        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" value={label} onChange={(e) => setLabel(e.target.value)} /></td>
              <td><input type="text" value={type} onChange={(e) => setType(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleAddField}>Add</button>
      </div>
    </div>
  );
};

export default ModalContent;
