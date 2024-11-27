importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAISMT6efSSAAsEOW4BSoHe4luZEG0MlaU",
  authDomain: "notification-92dce.firebaseapp.com",
  projectId: "notification-92dce",
  storageBucket: "notification-92dce.firebasestorage.app",
  messagingSenderId: "431799702508",
  appId: "1:431799702508:web:53f6f24c1c2a1d612de6c9",
  measurementId: "G-V6HKETCQZQ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
