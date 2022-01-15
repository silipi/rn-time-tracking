import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsEUEJhK-kePAa3EvWIO7mPsXOnajd_uw",
  authDomain: "rn-time-tracking.firebaseapp.com",
  projectId: "rn-time-tracking",
  storageBucket: "rn-time-tracking.appspot.com",
  messagingSenderId: "708165148535",
  appId: "1:708165148535:web:83a0120e37430b6c18cb72",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
