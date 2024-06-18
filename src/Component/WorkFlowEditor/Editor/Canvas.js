import React, { useEffect, useState } from "react";
// import { useEdgesState } from "reactflow";
import "./nodes.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Config from "../Config";

import SidebarAction from "./Sidebar";


import DiagramAdapter from "./DiagramAdapter";

const Canvas = () => {
  const [error, setError] = useState("");
  const [jwtid, setJwtId] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [codeData, setCodeData] = useState({});

  const [activeCodeData, setActiveCodeData] = useState({ id: null, type: "" });

  useEffect(() => {
      const savedData = localStorage.getItem('restoredata');
      console.log("hello");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          console.log(parsedData);
          const { nodes, edges, codeData } = parsedData;
          console.log(codeData);
          setNodes(nodes);
          setCodeData(codeData);
          setEdges(edges);
  
        } catch (error) {
          console.error("Failed to parse JSON data:", error);
        }
      }
  }, []);

  const onActivateNode = (activeNodeId) =>
    setActiveCodeData(codeData[activeNodeId]);

  const onDeactivateAll = () => {
    setActiveCodeData({ id: null, type: "" });
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

  const onAddNode = (newNodeId, newNodeType,formInputs) => {
    
    codeData[newNodeId] = {
      id: newNodeId,
      type: newNodeType,
      data: {},
      formInputs:formInputs
    };

    setCodeData(codeData);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ID = params.get('Id');
    console.log("Extracted ID:", ID);

    if (ID) {
      setJwtId(ID);
    } else {
      console.warn("No 'id' parameter found in URL");
    }
  }, []);

  
  const onSave = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        nodes: nodes,
        edges: edges,
        codeData: codeData
      };
      const tempOutput = JSON.stringify(dataToSave);
      console.log("json",tempOutput)
      const APIURL = "http://127.0.0.1:8985/api/v1/workflowhistory/create"
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
      console.log("resp", response);
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
  console.log("API",error);

  const restoreData = () => {
    const savedData = localStorage.getItem('final');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        //console.log(parsedData);
        const { nodes, edges, codeData } = parsedData;
        console.log(codeData);
        setNodes(nodes);
        setCodeData(codeData);
        setEdges(edges);

      } catch (error) {
        console.error("Failed to parse JSON data:", error);
      }
    }
  };

  const DeployData  = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        nodes: nodes,
        edges: edges,
        codeData: codeData
      };
      const tempOutput = JSON.stringify(dataToSave);
      console.log("json",tempOutput)
      const APIURL = "http://127.0.0.1:8985/api/v1/workflowhistory/create"
      const response = await axios.post(APIURL, {
        id: jwtid,
        script: tempOutput,
        versiontype: "deploy",
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
      console.log("resp", response);
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

  // useEffect(() => {
  //   restoreData();
  // }, []);

 
  const renderPropertyEditor = () => {

    if (activeCodeData.id !== null && Config[activeCodeData.type]) {
      const PropertyEditor =
        Config[activeCodeData.type].propertyEditorComponent;
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

    <div >
      <div className="flex-container">
        <div className="column-actions">
          <h4 className="workflow-content-heading">Actions</h4>
          <SidebarAction />
        </div>
        <div className="column-canvas">
          <h4 className="workflow-content-heading">Workflow Deisgner</h4>
          <DiagramAdapter
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onAddNode={onAddNode}
            onActivateNode={onActivateNode}
            onDeactivateAll={onDeactivateAll}

          />
        </div>

        <div className="column-property">
          
          <div style={{ display:"flex" , justifyContent:"space-between" }}>
            <button className="workflow-canvas-save-btn" onClick={onSave}>
              Save
            </button>
            <button className="workflow-canvas-save-btn" onClick={DeployData}>
              Save & Deploy
            </button>
            <br></br>
            </div>
          <h4 className="workflow-content-heading">Property</h4>
          {renderPropertyEditor()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Canvas;
