import { React } from "react";

const AssignPropertyEditor = ({ codeData, updateData }) => {
  //console.log(codeData)
    const type = codeData.type;
    const localData = codeData.data;
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    if (type === "assign") {

      const onValuenameChange = (event) => {
        localData.firstName = event.target.value;
       
        updateData(localData);
        };
      const onValuelastChange = (event) => {
        
          localData.lastName = event.target.value;
    
          updateData(localData);
          };
      const onValueEmailChange = (event) => {
           
            localData.email = event.target.value;
            updateData(localData);
            };

        return (
            <form >
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={localData.firstName}
                onChange={onValuenameChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={localData.lastName}
                onChange={onValuelastChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={localData.email}
                onChange={onValueEmailChange}
              />
            </label>
            
          </form>
        );
    } 

    return null;
};

export default AssignPropertyEditor;