import { useEffect, useState, type ReactNode } from "react";
import type { Usuario } from "../interfaces/usuario";
import { AuthContext } from "./AuthContext";

interface MyComponentProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: MyComponentProps) => {

    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        const savedExpiresAt = localStorage.getItem("expires_at");
        if (savedUser && savedToken && savedExpiresAt) {
            const exp = parseInt(savedExpiresAt, 10) * 1000;
            if (Date.now() >= exp) {
                logout();
            } else {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const savedExpiresAt = localStorage.getItem("expires_at");
            if (savedExpiresAt) {
                const exp = parseInt(savedExpiresAt, 10) * 1000;
                if (Date.now() >= exp) {
                    logout();
                }
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const login = (userData: Usuario, newToken: string, expiresAt: number) => {
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', newToken);
        localStorage.setItem("expires_at", expiresAt.toString());
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem("expires_at");
    };

    return (
        <AuthContext.Provider value={{ user,setUser, token, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}