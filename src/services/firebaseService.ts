import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

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

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const FORMSPREE_URL = "https://formspree.io/f/mwvylaed";

export const submitInquiry = async (data: any) => {
  const path = 'inquiries';
  try {
    // Save to Firebase
    const docRef = await addDoc(collection(db, path), {
      ...data,
      createdAt: serverTimestamp(),
    });

    // Send to Formspree
    await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        subject: "New Inquiry: " + (data.title || "No Title"),
        ...data,
        formType: "Inquiry"
      })
    });

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const subscribeNewsletter = async (email: string) => {
  const path = 'subscriptions';
  try {
    // Save to Firebase
    const docRef = await addDoc(collection(db, path), {
      email,
      createdAt: serverTimestamp(),
    });

    // Send to Formspree
    await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        subject: "New Newsletter Subscription",
        formType: "Subscription"
      })
    });

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getInquiries = (callback: (data: any[]) => void) => {
  const path = 'inquiries';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(inquiries);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
};

export const getSubscriptions = (callback: (data: any[]) => void) => {
  const path = 'subscriptions';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(subs);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });
};
