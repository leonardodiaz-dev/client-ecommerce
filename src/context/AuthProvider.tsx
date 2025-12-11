import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Usuario } from "../interfaces/usuario";
import { AuthContext } from "./AuthContext";

interface MyComponentProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: MyComponentProps) => {

    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem("expires_at");
        localStorage.removeItem("direccionItem");
        localStorage.removeItem("direccion");
    }, [])

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        const savedExpiresAt = localStorage.getItem("expires_at"); 

        if (savedUser && savedToken && savedExpiresAt) {
            
            const expMs = parseInt(savedExpiresAt, 10);

            if (Date.now() >= expMs) {
                logout();
            } else {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }
        }
        setLoading(false);
    }, [logout]);

    useEffect(() => {
        const interval = setInterval(() => {
            const savedExpiresAt = localStorage.getItem("expires_at");
            if (savedExpiresAt) {
                
                const expMs = parseInt(savedExpiresAt, 10);

                if (Date.now() >= expMs) {
                    logout();
                }
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [logout]);

    const login = (userData: Usuario, newToken: string, expiresAt: string) => {

        const expirationTimestampMs = new Date(expiresAt).getTime();

        setUser(userData);
        setToken(newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', newToken);
        localStorage.setItem("expires_at", expirationTimestampMs.toString());
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}