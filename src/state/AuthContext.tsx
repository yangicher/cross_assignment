import React, { createContext, useContext, useMemo, useState } from 'react';

export type Role = 'mentor' | 'menti';

type AuthContextValue = {
    isLoggedIn: boolean;
    role: Role | null;
    completeAuth: (role: Exclude<Role, null>) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<Role | null>(null);

    const completeAuth = (nextRole: Exclude<Role, null>) => {
        setRole(nextRole);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setRole(null);
    };

    const value = useMemo(
        () => ({ isLoggedIn, role, completeAuth, logout }),
        [isLoggedIn, role]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return ctx;
}
