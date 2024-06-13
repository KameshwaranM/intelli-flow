import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./sidebar.css"; // Make sure to style according to MUI components if needed
import { BiSolidRectangle } from "react-icons/bi";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ data }) => {
  const [visibleOptions, setVisibleOptions] = useState({});

  const onDragStart = (event, nodeType, formInputs, label) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("formInputs", JSON.stringify(formInputs));
    event.dataTransfer.setData("label", label);
    console.log(label);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSettingsClick = (categoryName) => {
    setVisibleOptions((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <List>
          {data.map((category, index) => {
            const categoryName = Object.keys(category)[0];
            const tasks = category[categoryName];
            const isOptionsVisible = visibleOptions[categoryName];

            return (
              <div key={index} className="category">
                <ListItem button onClick={() => handleSettingsClick(categoryName)}>
                  <ListItemText primary={categoryName} />
                  {isOptionsVisible ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isOptionsVisible} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {tasks.map((task) => (
                      <ListItem
                        key={task.TaskName}
                        draggable
                        onDragStart={(event) => onDragStart(event, "assign", task.FormInputs, task.TaskName)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={task.TaskName} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidebar.defaultProps = {
  data: [],
};

export default Sidebar;
