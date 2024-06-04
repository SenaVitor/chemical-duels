import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

function firebaseConfigVariavel() {
    if (typeof process !== 'undefined') {
        console.log('process: ', process);
    }
    return {
        apiKey: "AIzaSyCbfbEO5kqgwMpC3XgHd2_6PTUzTsgItag",
        authDomain: "chemical-duel.firebaseapp.com",
        projectId: "chemical-duel",
        storageBucket: "chemical-duel.appspot.com",
        messagingSenderId: "362423726366",
        appId: "1:362423726366:web:3ebb02b4a3a3a87b2c190f",
        measurementId: "G-Q21XTWF6LE"
    };
}

const app = initializeApp(firebaseConfigVariavel());
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Função para buscar valores na coleção 'placar'
export async function getScores() {
  const scoresCollection = collection(db, 'chemical-duel');
  const scoresQuery = query(scoresCollection, orderBy('score', 'desc'), limit(10));
  const scoresSnapshot = await getDocs(scoresQuery);
  const scoresList = scoresSnapshot.docs.map(doc => doc.data());
  return scoresList;
}

// Função para adicionar valores à coleção 'placar'
export async function addScore(name, score) {
    try {
      await addDoc(collection(db, 'chemical-duel'), { name: name, score: score });
      return true;
    } catch (error) {
      alert('Ocorreu um erro ao salvar sua pontuação.');
      return false;
    }
  }

