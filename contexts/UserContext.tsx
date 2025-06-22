import { createContext, useState, ReactNode, useContext } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

// Define user type - updated to match Appwrite's User structure
export interface User {
  $id: string;
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

  async function login(email: string, password: string): Promise<void> {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "An error occurred");
    }
  }

  async function register(email: string, password: string): Promise<void> {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "An error occurred");
    }
  }

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
