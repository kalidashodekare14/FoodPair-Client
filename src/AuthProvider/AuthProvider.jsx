import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";



export const authContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();


    const registerSystem = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginSystem = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLoginSystem = () =>{
       return signInWithPopup(auth, provider)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser)
        })
        return () => unSubscribe()
    }, [user])


    const authInfo = { user, loading, registerSystem, loginSystem, googleLoginSystem }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;