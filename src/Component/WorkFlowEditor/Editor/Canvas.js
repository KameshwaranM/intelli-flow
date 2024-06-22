import React, { useEffect, useState } from "react";
import "./nodes.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Config from "../Config";
import SidebarAction from "./Sidebar";
import VariableDef from "./VariableDef";
import DiagramAdapter from "./DiagramAdapter";

const Canvas = () => {
  const [error, setError] = useState("");
  const [jwtid, setJwtId] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [codeData, setCodeData] = useState({});
  const [activeCodeData, setActiveCodeData] = useState({ id: null, type: "" });
  const [activeSection, setActiveSection] = useState("variableDef");

  useEffect(() => {
    const savedData = localStorage.getItem('restoredata');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const { nodes, edges, codeData } = parsedData;
        setNodes(nodes);
        setCodeData(codeData);
        setEdges(edges);
      } catch (error) {
        console.error("Failed to parse JSON data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ID = params.get('Id');
    if (ID) {
      setJwtId(ID);
    } else {
      console.warn("No 'Id' parameter found in URL");
    }
  }, []);

  const onActivateNode = (activeNodeId) => {
    if (codeData[activeNodeId]) {
      setActiveCodeData(codeData[activeNodeId]);
    } else {
      setActiveCodeData({ id: null, type: "" });
    }
    setActiveSection("propertyEditor");
  };

  const onDeactivateAll = () => {
    setActiveCodeData({ id: null, type: "" });
    setActiveSection("variableDef");
  };

  const onUpdateCodeData = (data) => {
    setCodeData((prevData) => ({
      ...prevData,
      [activeCodeData.id]: {
        ...prevData[activeCodeData.id],
        data: data,
      },
    }));
    setActiveCodeData((prevData) => ({
      ...prevData,
      data: data,
    }));
  };

  const onAddNode = (newNodeId, newNodeType, formInputs) => {
    setCodeData((prevCodeData) => ({
      ...prevCodeData,
      [newNodeId]: {
        id: newNodeId,
        type: newNodeType,
        data: {},
        formInputs:formInputs
      },
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      
      const dataToSave = { nodes, edges, codeData };
      const tempOutput = JSON.stringify(dataToSave);
      localStorage.setItem("restoredata",tempOutput)
      console.log(tempOutput)
      const APIURL = "http://127.0.0.1:8985/api/v1/workflowhistory/create";
      const response = await axios.post(APIURL, {
        id: jwtid,
        script: tempOutput,
        versiontype: "save",
      });

      toast.success("Workflow Created Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      
    } catch (error) {
      console.error("Error creating workflow:", error);
      let errorMessage = "An unexpected error occurred.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const removeFormInputsFromCodeData = (codeData) => {
    const updatedCodeData = { ...codeData };
    for (const nodeId in updatedCodeData) {
      if (Object.hasOwnProperty.call(updatedCodeData, nodeId)) {
        delete updatedCodeData[nodeId].formInputs;
      }
    }
    return updatedCodeData;
  };

  const restoreData = () => {
    const savedData = localStorage.getItem('final');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const { nodes, edges, codeData } = parsedData;
        setNodes(nodes);
        setCodeData(codeData);
        setEdges(edges);
      } catch (error) {
        console.error("Failed to parse JSON data:", error);
      }
    }
  };

  const DeployData = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = { nodes, edges, codeData };
      const tempOutput = JSON.stringify(dataToSave);
      const APIURL = "http://127.0.0.1:8985/api/v1/workflowhistory/create";
      const response = await axios.post(APIURL, {
        id: jwtid,
        script: tempOutput,
        versiontype: "deploy",
      });

      toast.success("Workflow Deployed Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.log("resp", response);
    } catch (error) {
      console.error("Error deploying workflow:", error);
      let errorMessage = "An unexpected error occurred.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const showVariableDef = () => {
    setActiveSection("variableDef");
  };

  const renderPropertyEditor = () => {
    if (activeCodeData.id !== null && Config[activeCodeData.type]) {
      const PropertyEditor = Config[activeCodeData.type].propertyEditorComponent;
      return (
        <PropertyEditor
          key={activeCodeData.id}
          codeData={activeCodeData}
          updateData={onUpdateCodeData}
        />
      );
    } else {
      return (
        <em className="workflow-content-heading">
          Select an element from the canvas to update.
        </em>
      );
    }
  };

  return (
    <div>
      <div className="flex-container">
        <div className="column-actions">
          <h4 className="workflow-content-heading">Actions</h4>
          <SidebarAction />
        </div>
        <div className="column-canvas">
          <h4 className="workflow-content-heading">Workflow Designer</h4>
          <DiagramAdapter
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onAddNode={onAddNode}
            onActivateNode={onActivateNode}
            onDeactivateAll={onDeactivateAll}
            showVariableDef={showVariableDef}
          />
        </div>
        <div className="column-property">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="btn btn-primary code-disply-save-btn" onClick={onSave}>
              Save
            </button>
            <button className="btn btn-primary code-disply-save-btn" onClick={DeployData}>
              Save & Deploy
            </button>
          </div>
          <br />
          {activeSection === "variableDef" ? (
            <>
              <h4 className="workflow-content-heading">Variable Definition</h4>
              <VariableDef />
            </>
          ) : (
            <>
              <h4 className="workflow-content-heading">Add Variable</h4>
              {renderPropertyEditor()}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Canvas;
