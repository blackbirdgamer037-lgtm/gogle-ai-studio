import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const ADMIN_EMAIL = 'shashanknayal4@gmail.com';

let isSignInPending = false;

export const signInWithGoogle = async () => {
  if (isSignInPending) {
    console.warn('Sign-in already in progress. Ignoring duplicate request.');
    return null;
  }
  isSignInPending = true;
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  } finally {
    isSignInPending = false;
  }
};

export const signInAsGuest = async (displayName: string = 'Guest') => {
  try {
    const cred = await signInAnonymously(auth);
    if (cred.user) {
      await updateProfile(cred.user, {
        displayName: displayName
      });
    }
    return cred.user;
  } catch (error) {
    console.error('Guest login failed:', error);
    throw error;
  }
};

export const loginAsAdmin = async (password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
  } catch (error) {
    console.error('Admin login failed:', error);
    throw error;
  }
};

export const isAdmin = (user: any) => {
  return user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
};

// Connectivity check
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      // We explicitly DO NOT log email or PII in the error object sent to the console/UI
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  // In production, we would log this to a secure backend, not the browser console.
  // For this environment, we keep the logs minimal and non-PII.
  console.error('Firestore Operation Restricted:', operationType, path); 
  throw new Error(`Permission Denied: Unauthorized ${operationType} on ${path}`);
}
