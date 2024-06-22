import React, { useState } from "react";
import './assignproperty.css';

const AssignPropertyEditor = ({ codeData, updateData }) => {
  const type = codeData.type;
  const nodeId = codeData.id; // Assuming each node has a unique id
  const localData = codeData.data || {}; // Ensure localData is not undefined
  const formInputs = JSON.parse(codeData.formInputs);
  const optionsvalue = JSON.parse(localStorage.getItem('formFields')) || [];
  
  // Load stored input values from localStorage
  const storedData = JSON.parse(localStorage.getItem('inputValues')) || {};
  const initialInputValues = storedData[nodeId] || localData;
  
  const [suggestions, setSuggestions] = useState({});
  const [inputValues, setInputValues] = useState(initialInputValues);

  const updateLocalStorage = (updatedInputValues) => {
    const storedData = JSON.parse(localStorage.getItem('inputValues')) || {};
    storedData[nodeId] = updatedInputValues;
    localStorage.setItem('inputValues', JSON.stringify(storedData));
  };

  const handleChange = (event, label) => {
    const { value } = event.target;
    const updatedInputValues = { ...inputValues };

    if (value.trim() === "") {
      delete updatedInputValues[label];
    } else {
      updatedInputValues[label] = value;
    }

    setInputValues(updatedInputValues);
    updateData({ ...localData, ...updatedInputValues });
    updateLocalStorage(updatedInputValues);

    const filteredSuggestions = optionsvalue.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions({ ...suggestions, [label]: filteredSuggestions });
  };

  const handleSuggestionClick = (suggestion, label) => {
    const updatedInputValues = { ...inputValues, [label]: suggestion };
    if (suggestion.trim() === "") {
      delete updatedInputValues[label];
    } else {
      updatedInputValues[label] = suggestion;
    }
    setInputValues(updatedInputValues);
    updateData({ ...localData, [label]: suggestion });
    updateLocalStorage(updatedInputValues);
    setSuggestions({ ...suggestions, [label]: [] });
    
  };

  if (type === "assign" && formInputs) {
    return (
      <form>
        {formInputs.map((input, index) => (
          <label key={index} className="form-label">
            {input.label}:
            <div className="autocomplete-container">
              <input
                type={input.type}
                name={input.label}
                value={inputValues[input.label]}
                required={input.required} 
                onChange={(event) => handleChange(event, input.label)}
                placeholder={`Enter ${input.label}`}
              />
              {suggestions[input.label] && suggestions[input.label].length > 0 && (
                <ul className="suggestions-list">
                  {suggestions[input.label].map((suggestion, idx) => (
                    <li key={idx} onClick={() => handleSuggestionClick(suggestion, input.label)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>
        ))}
      </form>
    );
  }

  return null;
};

export default AssignPropertyEditor;
