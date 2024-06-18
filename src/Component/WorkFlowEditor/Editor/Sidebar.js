import React from "react";
import TaskList from './Tasklist'
import "./sidebar.css";
import taskData from './data'
import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";
import { BiSolidRectangle } from "react-icons/bi";
import { BsXDiamond } from "react-icons/bs";
import { IoTimer } from "react-icons/io5";

const SidebarAction = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      {/* <div
        className="node node-start"
        onDragStart={(event) => onDragStart(event, "start")}
        draggable
      >
        Start
      </div>
      <div
        className="node node-if"
        onDragStart={(event) => onDragStart(event, "if")}
        draggable
      >
        If
      </div>
      <div
        className="node node-assign"
        onDragStart={(event) => onDragStart(event, "assign")}
        draggable
      >
        Node
      </div>
      <div
        className="node node-log"
        onDragStart={(event) => onDragStart(event, "log")}
        draggable
      >
        Timer
      </div>
      <div
        className="node node-end"
        onDragStart={(event) => onDragStart(event, "end")}
        draggable
      >
        End
      </div> */}
      <div>
        <TaskList data={taskData}/>
      </div>
    </aside>
  );
};

export default SidebarAction;
