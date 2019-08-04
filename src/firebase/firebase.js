import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAHDTB0TnzcKhPNQQGwjWPyt3AxrNodgws",
    authDomain: "varpet-com.firebaseapp.com",
    databaseURL: "https://varpet-com.firebaseio.com",
    projectId: "varpet-com",
    storageBucket: "varpet-com.appspot.com",
    messagingSenderId: "991484248256",
    appId: "1:991484248256:web:57ed0cbfaefa85d1"
  };
  
  firebase.initializeApp(firebaseConfig);

//export const fire =firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

