import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Create a user profile document in users/{uid}.
 */
export async function createUserProfile(uid, data) {
  const userRef = doc(db, 'users', uid);
  const profileData = {
    uid,
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    role: data.role || 'donor',
    status: data.status || 'active',
    photoURL: data.photoURL || null,
    city: data.city || '',
    address: data.address || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(userRef, profileData, { merge: true });
  return profileData;
}

/**
 * Get user profile by UID.
 */
export async function getUserProfile(uid) {
  if (!uid) return null;
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return { uid: snap.id, ...snap.data() };
  }
  return null;
}

/**
 * Update allowed fields of a user profile in users/{uid}.
 */
export async function updateUserProfile(uid, updates) {
  if (!uid) return;
  const userRef = doc(db, 'users', uid);
  
  // Protect system fields from client mutation
  const safeUpdates = { ...updates };
  delete safeUpdates.role;
  delete safeUpdates.status;
  delete safeUpdates.uid;
  safeUpdates.updatedAt = serverTimestamp();

  await updateDoc(userRef, safeUpdates);
}

/**
 * Fetch role for a user by UID.
 */
export async function getUserRole(uid) {
  const profile = await getUserProfile(uid);
  return profile?.role || 'donor';
}

/**
 * Admin operation: Update user account status (active | inactive).
 */
export async function updateUserStatus(uid, status) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    status,
    updatedAt: serverTimestamp()
  });
}

/**
 * Admin operation: Get all user profiles from Firestore.
 */
export async function getAllUsers() {
  const usersRef = collection(db, 'users');
  const snap = await getDocs(usersRef);
  return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
}
