import React, {createContext, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {Firebase_Auth} from '../../config/Firebase';
import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {Firestore_DB} from '../../config/Firebase';
import Loading from '../component/Loading';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Firebase_Auth, async authUser => {
      if (authUser) {
        setUser(authUser);
        const userDocRef = doc(Firestore_DB, 'users', authUser.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, docSnapshot => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          }
        });
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async nama => {
    if (user) {
      try {
        // Update nama di Firestore
        await updateDoc(doc(Firestore_DB, 'users', user.uid), {nama});
        // Update userData di context
        setUserData(prev => ({...prev, nama}));
      } catch (error) {
        console.error('Failed to update user profile:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{user, userData, loading, updateUserProfile}}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
