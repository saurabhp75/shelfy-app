import { createContext, useState, ReactNode, useContext } from "react";

// Define user type
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Define context type
export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Define provider props type
interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string): Promise<void> {}

  async function register(email: string, password: string): Promise<void> {}

  async function logout(): Promise<void> {}

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}



// Wrap the UserProvider component around the root layout stack
