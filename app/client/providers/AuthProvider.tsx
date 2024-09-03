'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextProps {
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, role: string) => Promise<void>;
    token: string | null;
    role: string | null;
    fetchRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string| null>(null);
    const router = useRouter();

    useEffect(() => {
        const tokenFromCookie = Cookies.get("token");
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
            fetchRoles();
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/login`,
                { email, password }
            );
            const { token } = response.data;
            setToken(token);
            Cookies.set("token", token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
            await fetchRoles(); 
        } catch (error) {
            console.error("Failed to login", error);
            //@ts-ignore
            if (error.response?.data) {
                throw new Error((error as any).response?.data?.error || "Failed to login");
            }
            throw new Error(`Failed to login: ${error}`);
        }
    };

    const register = async (username: string, email: string, password: string, role: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/register`,
                { username, email, password, role }
            );
            const { token } = response.data;
            setToken(token);
            Cookies.set("token", token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
            await fetchRoles();
        } catch (error) {
            console.error("Failed to register", error);
            //@ts-ignore
            if (error.response?.data) {
                throw new Error((error as any).response?.data?.error || "Failed to register");
            }
            throw new Error(`Failed to register: ${error}`);
        }
    };

    const fetchRoles = async () => {
        try {
            if (token) {
                console.log("Fetching roles");
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/role`, {
                    headers: { Authorization: `${token}` },
                });
                if (response.data.message === "jwt expired") {
                    // Token expirado, eliminarlo y redirigir al login
                    Cookies.remove("token");
                    setToken(null);
                    router.push("/login");
                    return;
                }
                setRole(response.data.role);
            }
        } catch (error) {
            Cookies.remove("token");
            router.push("/error")
            console.error("Failed to fetch roles", error);
            setRole(null);
        }
    };

    return (
        <AuthContext.Provider value={{ login, register, token, role, fetchRoles }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
