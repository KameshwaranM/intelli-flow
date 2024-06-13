import React from "react";
import TaskList from './Tasklist'
import "./sidebar.css";
import taskData from './data'
// import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";
// import { BiSolidRectangle } from "react-icons/bi";
// import { BsXDiamond } from "react-icons/bs";
// import { IoTimer } from "react-icons/io5";

const SidebarAction = () => {
  // const onDragStart = (event, nodeType) => {
  //   event.dataTransfer.setData("application/reactflow", nodeType);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  return (
    <aside>
      {/* <div
        className="node node-start"
        onDragStart={(event) => onDragStart(event, "start")}
        draggable
      >
        <FaCirclePlay className="workflow-node-icon" />
        Start
      </div>
      <div
        className="node node-if"
        onDragStart={(event) => onDragStart(event, "if")}
        draggable
      >
        <BsXDiamond className="workflow-node-icon" />If
      </div>
      <div
        className="node node-assign"
        onDragStart={(event) => onDragStart(event, "assign")}
        draggable
      >
        <BiSolidRectangle className="workflow-node-icon" />
        Node
      </div>
      <div
        className="node node-log"
        onDragStart={(event) => onDragStart(event, "log")}
        draggable
      >
        <IoTimer className="workflow-node-icon"/>
        Timer
      </div>
      <div
        className="node node-end"
        onDragStart={(event) => onDragStart(event, "end")}
        draggable
      >
        <FaCircleStop className="workflow-node-icon" />
        End
      </div> */}
      <div>
        <TaskList data={taskData}/>
      </div>
    </aside>
  );
};

export default SidebarAction;
