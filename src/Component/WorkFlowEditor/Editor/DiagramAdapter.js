import { useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  isNode,
} from "react-flow-renderer";

import IfNode from "../ReactFlow/Nodes/IfNode";
import StartNode from "../ReactFlow/Nodes/StartNode";
import EndNode from "../ReactFlow/Nodes/EndNode";
import AssignNode from "../ReactFlow/Nodes/AssignNode";
import ConsoleCustomNode from "../ReactFlow/Nodes/ConsoleNode";
import { Controls, Background } from "react-flow-renderer";

const nodeTypes = {
  if: IfNode,
  start: StartNode,
  end: EndNode,
  assign: AssignNode,
  log: ConsoleCustomNode,
};
const connectionLineStyle = { stroke: "#fff" };

let id = 2;
const getId = () => `node_${id++}`;

const DiagramAdapter = ({
  nodes,
  setNodes,
  onAddNode,
  onActivateNode,
  onDeactivateAll

}) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onLoad = (_reactFlowInstance) =>

    setReactFlowInstance(_reactFlowInstance);

  const onConnect = (params) => {
    setNodes((els) => {
      
      const { source,target } = params;

      // Check if the target node already has a connection
      const targetNodeConnections = els.filter(edge => edge.target === target);
     

      if (targetNodeConnections.length === 0) {
        if (params.sourceHandle === "true") {
          
          params.label = "TRUE";
        } else if (params.sourceHandle === "false") {
          params.label = "FALSE";
        }
        if (params.label===null){params.label = "X";}
        
        params.style = { stroke: "#fff" };
        params.animated = true;
        return addEdge(params, els);
      }
      else {
        alert('This handle can only have one connection');
        return els;
      }




    });
  };

  const onElementsRemove = (elementsToRemove) => {
    setNodes((els) => removeElements(elementsToRemove, els));
  };

  const onSelectionChange = (elements) => {
    if (elements) {
      const selectedNodes = elements.filter((els) => isNode(els));

      if (selectedNodes.length > 0) {
        onActivateNode(selectedNodes[0].id);
      }
    }
  };

  const onPaneClick = () => onDeactivateAll();

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const nodeId = getId();

    const newNode = {
      id: nodeId,
      type,
      position,
      data: {},
    };

    setNodes(nodes.concat(newNode));
    onAddNode(nodeId, type);
  };

  return (
    <div
      style={{ height: "85vh", border: "1pt solid rgb(219 219 219)" }}
      ref={reactFlowWrapper}
    >

      <ReactFlow
        elements={nodes}

        nodeTypes={nodeTypes}
        deleteKeyCode={46}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onPaneClick={onPaneClick}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineStyle={connectionLineStyle}
      >
        <Controls />
        <Background variant="dots" gap={20} size={0.3} color="#bbb" />
      </ReactFlow>
    </div>
  );
};

export default DiagramAdapter;
