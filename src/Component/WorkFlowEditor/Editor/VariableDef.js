import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './variabledef.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
};

const VariableDef = ({ onValueChange }) => {
  const [fields, setFields] = useState([{ value: '' }]);
  const [submittedValues, setSubmittedValues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState([{ label: '', type: 'string' }]);

  const handleAddField = () => {
    setIsModalOpen(true);
  };

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = fields.map((field) => field.value.trim()).filter((value) => value !== '');
    setSubmittedValues(values);
    localStorage.setItem('formFields', JSON.stringify(values));
    console.log("formFields",localStorage.getItem('formFields'));
  };

  useEffect(() => {
    const storedFormFields = JSON.parse(localStorage.getItem('formFields'));
    if (storedFormFields) {
      setFields(storedFormFields.map((value) => ({ value })));
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem('formFields');
    setFields([{ value: '' }]);
    setSubmittedValues([]);
  };

  const handleModalChange = (index, event) => {
    const { name, value } = event.target;
    const newModalFields = [...modalFields];
    newModalFields[index][name] = value;
    setModalFields(newModalFields);
  };

  const handleAddModalField = () => {
    setModalFields([...modalFields, { label: '', type: 'string' }]);
  };

  const handleRemoveModalField = (index) => {
    const newModalFields = modalFields.filter((_, i) => i !== index);
    setModalFields(newModalFields);
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    const newFields = modalFields.map((field) => ({ value: `${field.label}:${field.type}` }));
    setFields([...fields, ...newFields]);
    setIsModalOpen(false);
    setModalFields([{ label: '', type: 'string' }]);
    handleSubmit(event); // Call handleSubmit after adding modal fields
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div className="field-container" key={index}>
            <input
              type="text"
              value={field.value}
              onChange={(event) => handleChange(index, event)}
              className="input-field"
            />
            <button
              type="button"
              className="remove-button"
              onClick={() => handleRemoveField(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>
          Add Field
        </button>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <h2>Add New Variable</h2>
          <form onSubmit={handleModalSubmit}>
            {modalFields.map((modalField, index) => (
              <div key={index} className="modal-field">
                <input
                  type="text"
                  name="label"
                  placeholder="Name"
                  value={modalField.label}
                  onChange={(event) => handleModalChange(index, event)}
                />
                <select
                  name="type"
                  value={modalField.type}
                  onChange={(event) => handleModalChange(index, event)}
                >
                  <option value="string">String</option>
                  <option value="integer">Integer</option>
                  <option value="float">Float</option>
                  <option value="boolean">Boolean</option>
                </select>
                <button type="button" onClick={() => handleRemoveModalField(index)}>
                  &times;
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddModalField}>
              Add
            </button>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default VariableDef;
