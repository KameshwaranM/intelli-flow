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
          {/* GENERAL Section */}
          <ListItem button className='category-sidebar-action' onClick={() => handleSettingsClick('GENERAL')} key="general-section">
            <ListItemText primary="GENERAL" />
            {visibleOptions['GENERAL'] ? (
              <ExpandLess  />
            ) : (
              <ExpandMore  />
            )}
          </ListItem>
          <Collapse in={visibleOptions['GENERAL']} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem key="start" sx={{ pl: 4 }}
                  onDragStart={(event) => onDragStart(event, "start", null, "Start")}
                  draggable
                >
                  <ListItemText className='category-sidebar-sub-name' primary="Start" />
              </ListItem>
              <ListItem key="if" sx={{ pl: 4 }}
                  className='category-sidebar-sub-name'
                  onDragStart={(event) => onDragStart(event, "if", null, "If")}
                  draggable
                >
                  <ListItemText className='category-sidebar-sub-name' primary="If" />
              </ListItem>
              <ListItem key="log" sx={{ pl: 4 }}
                  className='category-sidebar-sub-name'
                  onDragStart={(event) => onDragStart(event, "log", null, "Timer")}
                  draggable
                >
                  <ListItemText className='category-sidebar-sub-name' primary="Timer" />
              </ListItem>
              <ListItem key="end" sx={{ pl: 4 }}
                  className='category-sidebar-sub-name'
                  onDragStart={(event) => onDragStart(event, "end", null, "End")}
                  draggable
                >
                  <ListItemText className='category-sidebar-sub-name' primary="End" />
              </ListItem>
            </List>
          </Collapse>

          {/* Dynamic Category Sections */}
          {data.map((category, index) => {
            const categoryName = Object.keys(category)[0];
            const tasks = category[categoryName];
            const isOptionsVisible = visibleOptions[categoryName];

            return (
              <div key={categoryName} className="category">
                <ListItem
                  className='category-sidebar-action'
                  button
                  onClick={() => handleSettingsClick(categoryName)}
                >
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
                        <ListItemText className='category-sidebar-sub-name' primary={task.TaskName} />
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
