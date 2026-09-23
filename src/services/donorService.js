import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Calculate Next Eligible Donation Date
 */
export function getNextEligibleDate(lastDonationDate, gender = 'Female') {
  if (!lastDonationDate) return 'Eligible Now';
  const lastDate = lastDonationDate.toDate ? lastDonationDate.toDate() : new Date(lastDonationDate);
  if (isNaN(lastDate.getTime())) return 'Eligible Now';
  const gapDays = gender === 'Male' ? 90 : 120;
  const nextDate = new Date(lastDate.getTime() + gapDays * 24 * 60 * 60 * 1000);
  
  const today = new Date();
  if (today >= nextDate) {
    return 'Eligible Now';
  }
  return nextDate.toISOString().split('T')[0];
}

/**
 * Create a new donor profile in donors/{donorId} linked to userId.
 */
export async function createDonor(data) {
  const donorId = data.donorId || `BT-DONOR-${Math.floor(10000 + Math.random() * 90000)}`;
  const donorRef = doc(db, 'donors', donorId);

  const donorData = {
    donorId,
    userId: data.userId || '',
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    bloodGroup: data.bloodGroup || 'O+',
    gender: data.gender || 'Other',
    dateOfBirth: data.dateOfBirth || '',
    age: Number(data.age) || 25,
    weight: Number(data.weight) || 60,
    city: data.city || '',
    address: data.address || '',
    lastDonationDate: data.lastDonationDate || null,
    totalDonations: Number(data.totalDonations) || 0,
    eligibilityStatus: data.eligibilityStatus || 'eligible',
    emergencyAvailable: data.emergencyAvailable !== undefined ? data.emergencyAvailable : true,
    status: data.status || 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(donorRef, donorData, { merge: true });
  return donorData;
}

/**
 * Get donor profile by donorId.
 */
export async function getDonor(donorId) {
  if (!donorId) return null;
  const donorRef = doc(db, 'donors', donorId);
  const snap = await getDoc(donorRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

/**
 * Get donor profile linked to a specific Firebase Auth userId.
 */
export async function getDonorByUserId(userId) {
  if (!userId) return null;
  const q = query(collection(db, 'donors'), where('userId', '==', userId));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

/**
 * Get all active donors from Firestore.
 */
export async function getAllDonors() {
  const q = query(collection(db, 'donors'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Update an existing donor profile.
 */
export async function updateDonor(donorId, updates) {
  if (!donorId) return;
  const donorRef = doc(db, 'donors', donorId);
  const safeUpdates = { ...updates, updatedAt: serverTimestamp() };
  await updateDoc(donorRef, safeUpdates);
}

/**
 * Deactivate a donor profile.
 */
export async function deactivateDonor(donorId) {
  if (!donorId) return;
  const donorRef = doc(db, 'donors', donorId);
  await updateDoc(donorRef, {
    status: 'inactive',
    updatedAt: serverTimestamp()
  });
}
