import { 
  auth 
} from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { createUserProfile, getUserProfile } from './userService';
import { createDonor } from './donorService';

/**
 * Register a new user and create their Firestore user profile & donor profile.
 * Default role is strictly 'donor'.
 */
export async function registerUser({
  email,
  password,
  name = '',
  phone = '',
  bloodGroup = 'O+',
  gender = 'Other',
  dateOfBirth = '',
  age = 25,
  weight = 60,
  city = 'Mumbai',
  address = ''
}) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const uid = user.uid;

  // 1. Create users/{uid} document
  await createUserProfile(uid, {
    uid,
    name: name || email.split('@')[0],
    email,
    phone,
    role: 'donor',
    status: 'active',
    photoURL: user.photoURL || null,
    city,
    address
  });

  // 2. Create donors/{donorId} document linked via userId: uid
  await createDonor({
    userId: uid,
    name: name || email.split('@')[0],
    email,
    phone,
    bloodGroup,
    gender,
    dateOfBirth,
    age: Number(age) || 25,
    weight: Number(weight) || 60,
    city,
    address,
    lastDonationDate: null,
    totalDonations: 0,
    eligibilityStatus: 'eligible',
    emergencyAvailable: true,
    status: 'active'
  });

  return user;
}

/**
 * Login user with email and password using Firebase Authentication.
 */
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userProfile = await getUserProfile(user.uid);
  
  return {
    user,
    userProfile
  };
}

/**
 * Logout current authenticated user.
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Send password reset email.
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Get current Firebase Auth user.
 */
export function getCurrentUser() {
  return auth.currentUser;
}
