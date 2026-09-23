import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  registerUser as registerService, 
  loginUser as loginService, 
  logoutUser as logoutService, 
  resetPassword as resetPasswordService 
} from '../services/authService';
import { getUserProfile } from '../services/userService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          setUserRole(profile?.role || 'donor');
        } catch (err) {
          console.warn('Error loading user profile:', err);
          setUserRole('donor');
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await loginService(email, password);
    setCurrentUser(result.user);
    setUserProfile(result.userProfile);
    setUserRole(result.userProfile?.role || 'donor');
    return result;
  };

  const register = async (registrationData) => {
    const user = await registerService(registrationData);
    setCurrentUser(user);
    const profile = await getUserProfile(user.uid);
    setUserProfile(profile);
    setUserRole('donor');
    return user;
  };

  const logout = async () => {
    await logoutService();
    setCurrentUser(null);
    setUserProfile(null);
    setUserRole(null);
  };

  const resetPassword = async (email) => {
    await resetPasswordService(email);
  };

  const value = {
    currentUser,
    userProfile,
    userRole,
    loading,
    login,
    register,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
