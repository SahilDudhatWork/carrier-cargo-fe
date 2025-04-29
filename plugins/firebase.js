import { initializeApp, getApps } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAISMT6efSSAAsEOW4BSoHe4luZEG0MlaU",
  authDomain: "notification-92dce.firebaseapp.com",
  projectId: "notification-92dce",
  storageBucket: "notification-92dce.firebasestorage.app",
  messagingSenderId: "431799702508",
  appId: "1:431799702508:web:53f6f24c1c2a1d612de6c9",
  measurementId: "G-V6HKETCQZQ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let messaging;
if (process.client) {
  messaging = getMessaging(app);

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);

    const channel = new BroadcastChannel("firebase-notification");
    channel.postMessage({
      type: "NEW_NOTIFICATION",
      page: 1,
      limit: 10,
    });
  });
}

export { messaging };
