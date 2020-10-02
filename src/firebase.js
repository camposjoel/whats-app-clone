import firebase from 'firebase';

const firebaseConfig = {
	// firebase configuration goes here:
	apiKey: "AIzaSyBePp_tjYLOrLLS34bKuQ6nZSXO-IPejn8",
	authDomain: "whats-app-9f7ea.firebaseapp.com",
	databaseURL: "https://whats-app-9f7ea.firebaseio.com",
	projectId: "whats-app-9f7ea",
	storageBucket: "whats-app-9f7ea.appspot.com",
	messagingSenderId: "847528795856",
	appId: "1:847528795856:web:8860f2b5f554a85f9d48d5",
	measurementId: "G-HB2K87YP9Y"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;