import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

// Khởi tạo Firebase nếu chưa được khởi tạo
if (!firebase.apps.length) {
  firebase.initializeApp({});
}

export { database };
