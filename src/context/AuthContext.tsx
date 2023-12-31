import { getCurrentUser } from "@/lib/appwrite/api"
import { IContextType } from "@/types"
import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const INITIAL_USER = {
    id: '',
    email: "",
    name: "",
    username: "",
    imageUrl: "",
    bio: "",
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean

}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();  // can be destructured but typeScript will give error
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true)
                return true;
            }
            return false;
        } catch (error) {
            console.log(error)
            return false;  // user is not authenticated
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

    // loads when page reloads/mounts
    useEffect(() => {
        if (
            localStorage.getItem("cookieFallback") === "[]" ||
            localStorage.getItem("cookieFallback") === null
        )
            navigate("/sign-in")
        checkAuthUser();

    }, []) // [] means it will load when app reloads


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)