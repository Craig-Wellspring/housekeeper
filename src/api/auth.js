import firebase from 'firebase/app';

const signInUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
});

const currentUID = () => firebase.auth().currentUser?.uid;

const currentUser = () => firebase.auth().currentUser;

export {
  signInUser, signOutUser, currentUID, currentUser,
};
