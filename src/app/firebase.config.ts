// Importa las funciones necesarias desde el SDK
import { initializeApp } from "firebase/app";
import { setLogLevel } from 'firebase/app';

// Habilita los logs detallados
setLogLevel('debug');

// Configuración de tu app de Firebase (copia y pega tus credenciales aquí)
const firebaseConfig = {
  apiKey: "AIzaSyAymZKH1HT8ChBbjvRAiE7PyfcgpdR1zNM",
  authDomain: "honeytech-3ff84.firebaseapp.com",
  projectId: "honeytech-3ff84",
  storageBucket: "honeytech-3ff84.appspot.com",
  messagingSenderId: "487590607203",
  appId: "1:487590607203:web:efcd12d1b768e4331afb56",
  measurementId: "G-0BZG3XFJV2"
};

// Inicializa la app de Firebase
export const firebaseApp = initializeApp(firebaseConfig);
