import { use } from "react"
import { AuthContext } from "../context/AuthContext/AuthContext"

export const useAuth = () => {
    return use(AuthContext);
}