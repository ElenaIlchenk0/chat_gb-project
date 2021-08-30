import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDN9BpW3x99hLkJ99Gvm6FHtM01X4GFA4Y',
  authDomain: 'gb-messanger.firebaseapp.com',
  projectId: 'gb-messanger',
  storageBucket: 'gb-messanger.appspot.com',
  messagingSenderId: '91246327154',
  appId: '1:91246327154:web:41feb32f54b13059c119eb',
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export function signup(email, password) {
  console.log(email, password);
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
