const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * Callable function to assign custom claims / roles to users.
 * Accessible only by authorized Admins.
 */
exports.setUserRole = functions.https.onCall(async (data, context) => {
  // 1. Verify caller authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be logged in to assign user roles.'
    );
  }

  // 2. Verify caller is Admin
  const callerToken = context.auth.token;
  const isCallerAdmin = callerToken.role === 'admin';

  if (!isCallerAdmin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only Admins can assign user roles.'
    );
  }

  const { targetUid, role } = data;
  const validRoles = ['donor', 'admin'];

  if (!targetUid || !role || !validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Provide valid targetUid and role (donor | admin).'
    );
  }

  try {
    // 3. Set custom user claims in Firebase Authentication
    await admin.auth().setCustomUserClaims(targetUid, { role });

    // 4. Update user document in Firestore users/{uid}
    await admin.firestore().collection('users').doc(targetUid).update({
      role: role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, message: `Successfully updated user role to ${role}` };
  } catch (error) {
    console.error('Error setting user role:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
