import { createContext } from "react";
import type { Usuario } from "../interfaces/usuario";

type AuthContextType = {
    user: Usuario | null;
    setUser:React.Dispatch<React.SetStateAction<Usuario | null>>
    token: string | null;
    isAuthenticated: boolean;
    login: (userData: Usuario, token: string, expiresAt: number) => void;
    logout: () => void;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
