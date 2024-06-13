import React from "react";

const AssignPropertyEditor = ({ codeData, updateData }) => {
  const type = codeData.type;
  const localData = codeData.data;
  const formInputs = JSON.parse(codeData.formInputs );
    
  const handleChange = (event,label) => {
    
    localData[label]=event.target.value;
    updateData(localData);
};

    if (type === "assign" && formInputs) {
      
        return (
            <form>
                {formInputs.map((input, index) => (
                    <label key={index} className="form-label">
                        {input.label}:
                        <input
                            type={input.type}
                            name={input.label}
                            value={localData[input.label]}
                            onChange={(event) => handleChange(event, input.label)}
                        />
                    </label>
                ))}
            </form>
        );
    }

    return null;
};

export default AssignPropertyEditor;
