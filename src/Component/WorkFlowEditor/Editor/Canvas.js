import React, { useState, useEffect } from "react";

import "./nodes.css";

import Config from "../Config";

import Sidebar from "./Sidebar";


import DiagramAdapter from "./DiagramAdapter";

const Canvas = () => {
  const [nodes, setNodes] = useState([
    {
      id: "node_0",
      type: "start",
      position: { x: 150, y: 25 },
    },
   
  ]);

  const [codeData, setCodeData] = useState({
    node_0: {
      id: "node_0",
      type: "start",
      data: {}, 
    }
  });

  const [activeCodeData, setActiveCodeData] = useState({ id: null, type: "" });

  const onActivateNode = (activeNodeId) =>
    setActiveCodeData(codeData[activeNodeId]);

  const onDeactivateAll = () => {
    setActiveCodeData({ id: null, type: "" });
  };

  const onUpdateCodeData = (data) => {
    activeCodeData.data = data;
    codeData[data.id] = activeCodeData;

    setActiveCodeData(activeCodeData);
    setCodeData(codeData);
  };

  const onAddNode = (newNodeId, newNodeType) => {
    codeData[newNodeId] = {
      id: newNodeId,
      type: newNodeType,
      data: {},
    };

    setCodeData(codeData);
  };
  const onDisplayCode = () => {
    const dataToSave = {
      nodes: nodes,
      codeData: codeData
    };
    const tempOutput = JSON.stringify(dataToSave);
    //setOutput(tempOutput);
    localStorage.setItem('final', tempOutput);
    console.log(localStorage.getItem('final'));
  };

  const restoreData = () => {
    const savedData = localStorage.getItem('final');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        //console.log(parsedData);
        const { nodes, codeData } = parsedData;
        console.log(codeData);
        setNodes(nodes);
        setCodeData(codeData);

      } catch (error) {
        console.error("Failed to parse JSON data:", error);
      }
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
      <div className="headers">

        
          <button className="btn btn-primary code-disply-save-btn" onClick={onDisplayCode}>
            Save
          </button>
          <button className="btn btn-primary code-disply-save-btn" onClick={restoreData}>
            Restore
          </button>
        
      </div>
      <div className="flex-container">
        <div className="column-actions">
          <h2 className="workflow-content-heading">Tools</h2>
          <Sidebar />
        </div>
        <div className="column-canvas">
          <h2 className="workflow-content-heading">Canvas</h2>
          <DiagramAdapter
            nodes={nodes}
            setNodes={setNodes}
            onAddNode={onAddNode}
            onActivateNode={onActivateNode}
            onDeactivateAll={onDeactivateAll}

          />
        </div>

        <div className="column-property">
          
          <h2 className="workflow-content-heading">Property Panel</h2>
          {renderPropertyEditor()}
        </div>
      </div>

    </div>
  );
};

export default Canvas;
