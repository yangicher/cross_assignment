import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import client from '../api/client';

interface User {
    id: number;
    email: string;
    role: 'MENTOR' | 'MENTEE' | 'ADMIN';
    name?: string;
}

interface AuthContextType {
    login: (email: string, pass: string) => Promise<void>;
    register: (name: string, email: string, pass: string, role: 'MENTOR' | 'MENTEE') => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    userToken: string | null;
    userInfo: User | null;
    role: string | null;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const checkLoginStatus = async () => {
        try {
            setIsLoading(true);
            let token = await SecureStore.getItemAsync('userToken');
            let user = await SecureStore.getItemAsync('userInfo');

            if (token && user) {
                setUserToken(token);
                setUserInfo(JSON.parse(user));
            }
        } catch (e) {
            console.log(`Login Error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await client.post('/auth/login', { email, password });
            const { access_token, user } = response.data;

            setUserInfo(user);
            setUserToken(access_token);

            await SecureStore.setItemAsync('userToken', access_token);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
        } catch (error: any) {
            console.log(error);
            alert('Помилка входу: ' + (error.response?.data?.message || 'Перевірте дані'));
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, pass: string, role: 'MENTOR' | 'MENTEE') => {
        setIsLoading(true);
        try {
            await client.post('/auth/register', {
                email,
                password: pass,
                name,
                role
            });

            await login(email, pass);

        } catch (error: any) {
            console.log(error);
            alert('Помилка реєстрації: ' + (error.response?.data?.message || 'Щось пішло не так'));
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        setIsLoading(false);
    };

    const isLoggedIn = userToken !== null;
    const role = userInfo?.role || null;

    return (
        <AuthContext.Provider value={{ login, register, logout, isLoading, userToken, userInfo, role, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};