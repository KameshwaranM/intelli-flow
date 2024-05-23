import React, { useState } from "react";

import "../Editor/nodes.css";

import Config from "../Config";

import Sidebar from "../Editor/Sidebar";
import CodeDisplay from "../CodeGenerator/CodeDisplay";
import DiagramAdapter from '../Editor/DiagramAdapter.js'


export const Restore = () => {
  const [nodes, setNodes] = useState([{"id":"node_0","type":"start","position":{"x":150,"y":25}},{"id":"node_2","type":"assign","position":{"x":124.21875,"y":267.609375},"data":{}},{"id":"node_3","type":"assign","position":{"x":315.21875,"y":414.609375},"data":{}},{"source":"node_0","sourceHandle":"out","target":"node_2","targetHandle":"in","label":"X","style":{"stroke":"#fff"},"animated":true,"id":"reactflow__edge-node_0out-node_2in"},{"source":"node_2","sourceHandle":"source","target":"node_3","targetHandle":"in","label":"X","style":{"stroke":"#fff"},"animated":true,"id":"reactflow__edge-node_2source-node_3in"}]);

  const [codeData, setCodeData] = useState({"node_0":{"id":"node_0","type":"start","data":{}},"node_1":{"id":"node_1","type":"end","data":{}},"node_2":{"id":"node_2","type":"assign","data":{"name":"saranya","last":"m","email":"ds"}},"node_3":{"id":"node_3","type":"assign","data":{"name":"saranihrq","last":"lkbnwdl","email":"lkansfoihro"}}});

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
        <div className ="headers">
          headers
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
          <CodeDisplay nodes={nodes} codeData={codeData} />
          <br />
          <br />
          <br />
          <br />
          <h2 className="workflow-content-heading">Property Panel</h2>
          {renderPropertyEditor()}
        </div>
      </div>
    
    </div>
  );
};

export default Restore;
