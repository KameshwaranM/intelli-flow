import React from 'react';
import { Handle } from "react-flow-renderer";

const SingleConnectionHandle = (props) => {
  const { id, type, isConnectable, ...otherProps } = props;

  const handleConnection = (params,elements) => {
    console.log(elements)
    const { source } = params;
    // Check if the handle already has a connection
    const existingConnections = elements.filter(
        (edge => edge.source === source));

    if (existingConnections.length === 0) {
      return true; // Allow connection
    } else {
      alert('This handle can only have one connection');
      return false; // Prevent connection
    }
  };

  return (
    <Handle
      {...otherProps}
      id={id}
      type={type}
      isConnectable={isConnectable}
      onConnect={(params, elements) => handleConnection(params, elements)}
    />
  );
};

export default SingleConnectionHandle;
