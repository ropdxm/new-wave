import imageCompression from 'browser-image-compression';
import React, { createContext, useState } from 'react';

const context = createContext();

function Context({ children }) {
  const [user, setUser] = useState();
  const [events, setEvents] = useState();

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 540,
    };
    return await imageCompression(file, options);
  };

  const contextValues = {
    user,
    setUser,
    compressImage,
  };

  return <context.Provider value={contextValues}>{children}</context.Provider>;
}

export const useContext = () => {
  return React.useContext(context);
};

export default Context;
