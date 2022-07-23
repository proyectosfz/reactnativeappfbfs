// importar librerías de Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// recuperar las credenciales dadas por firebase - firestore
const firebaseConfig = {
    apiKey: "AIzaSyDwy13SFb8Vyf4fj-LkJ14ftiidbTxw7ms",
    authDomain: "fbusersonelink.firebaseapp.com",
    projectId: "fbusersonelink",
    storageBucket: "fbusersonelink.appspot.com",
    messagingSenderId: "199673355464",
    appId: "1:199673355464:web:6268c275eccf225a3159fd",
    measurementId: "G-YC7SZWEVB6"
  };
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  export default db

