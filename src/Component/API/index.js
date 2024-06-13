import React from 'react';
import { useIframeUrl } from '../IframeUrlContext/IframeUrlContext'; // Adjust the path as needed
import Sidebar from "../Sidebar/Sidebar";

const UIComponent = () => {
  const { iframeUrl } = useIframeUrl();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar style={{ flex: '0 0 250px' }} />
      <div style={{ flex: 1 }}>
        <iframe
          src={iframeUrl}
          title="App 2"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default UIComponent;