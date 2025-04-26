import { createContext, useState, useEffect, useContext, React } from 'react';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[])

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({
                ...user,
                username: data.username,
                profileUrl: data.profileUrl,
                userId: data.userId,
            })
        } else {
            console.log("No such document!");
        }
    }

    const login = async (email, password) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        }
        catch (e){
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)'))  msg = 'Invalid email address'
            if(msg.includes('(auth/invalid-credential)'))  msg = 'Incorrect Credentials'
            // if(msg.includes('(auth/email-already-in-use)'))  msg = 'Email address already used'
            return {success: false, msg};
        }
    }

    const logout = async () => {
        try{
            await signOut(auth);
            return {success: true};
        }
        catch (e){
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);

            // setUser(response.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username: username,
                userId: response.user.uid,
                profileUrl: profileUrl,
            })
            return {success: true,  data: response?.user};

        }
        catch (e){
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)'))  msg = 'Invalid email address'
            if(msg.includes('(auth/email-already-in-use)'))  msg = 'Email address already used'
            return {success: false, msg};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return value;
}
