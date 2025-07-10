import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";

// 🔥 Configuración Firebase para autenticación
const firebaseAuthConfig = {
  apiKey: "AIzaSyAymZKH1HT8ChBbjvRAiE7PyfcgpdR1zNM",
  authDomain: "honeytech-3ff84.firebaseapp.com",
  projectId: "honeytech-3ff84",
  storageBucket: "honeytech-3ff84.appspot.com",
  messagingSenderId: "487590607203",
  appId: "1:487590607203:web:efcd12d1b768e4331afb56",
  measurementId: "G-0BZG3XFJV2"
};

// 🔥 Configuración Firebase para Sensores (ESP32)
const firebaseESPConfig = {
  apiKey: "AIzaSyBdAxGJlwTxOx7saONk0FB5JwWuhFS2HwU",
  authDomain: "sensores-4ed17.firebaseapp.com",
  databaseURL: "https://sensores-4ed17-default-rtdb.firebaseio.com",
  projectId: "sensores-4ed17",
  storageBucket: "sensores-4ed17.firebasestorage.app",
  messagingSenderId: "118515219190",
  appId: "1:118515219190:web:4901584431dcff348f8ad7",
  measurementId: "G-0QZLQ21790"
};

// 🔑 Inicializar Firebase Authentication con persistencia
const authApp = getApps().some(app => app.name === "authApp")
  ? getApp("authApp")
  : initializeApp(firebaseAuthConfig, "authApp");

// Inicializa auth con persistencia en dispositivos móviles
initializeAuth(authApp, {
  persistence: indexedDBLocalPersistence,
});

export const firebaseAuthApp = authApp;

// 📡 Inicializar Firebase Sensores
export const firebaseESPApp = getApps().some(app => app.name === "espApp") 
  ? getApp("espApp") 
  : initializeApp(firebaseESPConfig, "espApp");

export const firebaseESPDatabase = getDatabase(firebaseESPApp);
