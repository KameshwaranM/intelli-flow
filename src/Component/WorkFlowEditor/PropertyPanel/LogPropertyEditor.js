const LogPropertyEditor = ({ codeData, updateData }) => {
    const type = codeData.type;
    const localData = codeData.data;

    if (type === "log") {
        const onValuenameChange = (event) => {
            localData.name = event.target.value;
           
            updateData(localData);
            };
          const onValuelastChange = (event) => {
            
              localData.type = event.target.value;
        
              updateData(localData);
              };
          const onValueDurationChange = (event) => {
               
                localData.command = event.target.value;
                updateData(localData);
                };
        return (
            <div>
                 <form >
            <label>
              name:
              <input
                type="text"
                name="name"
                value={localData.name}
                onChange={onValuenameChange}
              />
            </label>
            <label>
              type:
              <input
                type="text"
                name="type"
                value={localData.type}
                onChange={onValuelastChange}
              />
            </label>
            <label>
              duration:
              <input
                type="text"
                name="command"
                value={localData.command}
                onChange={onValueDurationChange}
              />
            </label>
            
          </form>
            </div>
        );
    }

    return null;
};

export default LogPropertyEditor;