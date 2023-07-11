import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Services/firebaseConfig";

export const AuthContext = createContext({});

export const AuthFirebase = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStoreAuth = () => {
            const user = sessionStorage.getItem("user");
            if (user) {
                setUser(JSON.parse(user));
            }
        }
        loadStoreAuth();
    }, [])

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            sessionStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });

    return (
        <AuthContext.Provider value={{ signInWithEmailAndPassword, signed: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

