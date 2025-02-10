import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyCNlJljv2lwLXOP7PQb9DKF4S6pw2i-G2U',
	authDomain: 'realtor-react-b20dc.firebaseapp.com',
	projectId: 'realtor-react-b20dc',
	storageBucket: 'realtor-react-b20dc.firebasestorage.app',
	messagingSenderId: '887785000660',
	appId: '1:887785000660:web:38e59b147c712562753541',
	measurementId: 'G-WLGD8SVR5Y',
}

const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore()
