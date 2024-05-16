import imageCompression from 'browser-image-compression';
import { createContext, useState, useEffect, useContext as ReactUseContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, usersRef } from '../firebase';
import { query, where, getDocs } from 'firebase/firestore';

const context = createContext();

function Context({ children }) {
  const [user, setUser] = useState();
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (userr) => {
      if (userr) {

        const q = query(usersRef, where("email", "==", userr.email));

        getDocs(q).then(docSnap => {
          docSnap.forEach(docc => {
            setUser({...docc.data(), id: docc.id});
          });
        });
        

      } else {
        // User is signed out
        setUser(null);
      }
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, []);



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
  return ReactUseContext(context);
};

export default Context;
