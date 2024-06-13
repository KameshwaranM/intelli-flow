import React, { createContext, useContext, useState } from 'react';

// Create the context
const IframeUrlContext = createContext();

// Define the provider component
export const IframeUrlProvider = ({ children }) => {
  const [iframeUrl, setIframeUrl] = useState('http://localhost:3001');
  return (
    <IframeUrlContext.Provider value={{ iframeUrl, setIframeUrl }}>
      {children}
    </IframeUrlContext.Provider>
  );
};

// Hook to use the context
export const useIframeUrl = () => useContext(IframeUrlContext);