const options = [
    { value: "=", label: "=" },
    { value: "<=", label: "<=" },
    { value: "<", label: "<" },
    { value: "=>", label: "=>" },
    { value: ">", label: ">" },
    { value: "!=", label: "!=" },
];

const IfPropertyEditor = ({ codeData, updateData }) => {
    const type = codeData.type;
    const localData = codeData.data;

    if (type === "if") {
        const onLeftChange = (event) => {
            localData.left = event.target.value;

            updateData(localData);
        };

        const onConditionChange = (event) => {
            localData.condition = event.target.value;

            updateData(localData);
        };

        const onRightChange = (event) => {
            localData.right = event.target.value;

            updateData(localData);
        };
        const onNameChange = (event) => {
            localData.name = event.target.value;

            updateData(localData);
        };
        const onTypeChange = (event) => {
            localData.type = event.target.value;

            updateData(localData);
        };

        const renderOptions = () =>
            options.map(opt =>
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            );

        return (
            <div>
                 <form >
            <label  className="form-label">
              name:
              <input
                type="text"
                name="name"
                value={localData.name}
                onChange={onNameChange}
              />
            </label>
            <label  className="form-label">
              type:
              <input
                type="text"
                name="type"
                value={localData.type}
                onChange={onTypeChange}
              />
            </label>
            <label  className="form-label">condition:
                <br></br>
            <input name="if_left" type="text" defaultValue={localData.left} placeholder="variable" onChange={onLeftChange} size="7" />
                &nbsp;<select name="if_cond" onChange={onConditionChange} defaultValue={localData.condition}>
                    {renderOptions()}
                </select>&nbsp;
                <input name="if_right" type="text" defaultValue={localData.right} placeholder="value" onChange={onRightChange} size="7" />
            </label>

            
          </form>
                 
               
            </div>
        );
    }

    return null;
};

export default IfPropertyEditor;