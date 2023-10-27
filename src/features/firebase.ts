import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLREuKtmUEH7cXjoOm6qvyzHN3Y0WUUG8",
  authDomain: "sample-917b6.firebaseapp.com",
  projectId: "sample-917b6",
  storageBucket: "sample-917b6.appspot.com",
  messagingSenderId: "473933554717",
  appId: "1:473933554717:web:004b6c070762ae0e6e12f4"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)