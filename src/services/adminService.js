import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';
import { getAllUsers, updateUserStatus } from './userService';
import { getAllDonors, updateDonor, deactivateDonor } from './donorService';

/**
 * Assign user role ('donor' | 'admin') using Firebase Cloud Function 'setUserRole'.
 */
export async function assignUserRole(targetUid, role) {
  const setUserRoleFn = httpsCallable(functions, 'setUserRole');
  const result = await setUserRoleFn({ targetUid, role });
  return result.data;
}

/**
 * Fetch all users for Admin Dashboard.
 */
export async function fetchAdminUsers() {
  return await getAllUsers();
}

/**
 * Update user status (active | inactive).
 */
export async function setAdminUserStatus(uid, status) {
  return await updateUserStatus(uid, status);
}

/**
 * Fetch all donors for Admin Dashboard.
 */
export async function fetchAdminDonors() {
  return await getAllDonors();
}

/**
 * Update donor profile details from Admin Dashboard.
 */
export async function setAdminDonorUpdate(donorId, updates) {
  return await updateDonor(donorId, updates);
}

/**
 * Deactivate a donor from Admin Dashboard.
 */
export async function setAdminDonorDeactivate(donorId) {
  return await deactivateDonor(donorId);
}
