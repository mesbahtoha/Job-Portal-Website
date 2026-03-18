import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Set observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            // jwt token
            // if (currentUser?.email) {
            //     const userData = { email: currentUser.email };

            //     axios.post('https://carrer-code-server-six.vercel.app/jwt', userData, { withCredentials: true }).then(res=>{
            //         console.log('Token after jwt', res.data)
            //     }).catch(error => console.log(error));
            // }

            console.log("User in the auth state change", currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
        loading,
        user
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider;