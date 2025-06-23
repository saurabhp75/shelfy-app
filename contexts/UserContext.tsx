import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
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
  authChecked: boolean;
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
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email: string, password: string): Promise<void> {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error(String(error));
      }
    }
  }

  async function register(email: string, password: string): Promise<void> {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error(String(error));
      }
    }
  }

  async function logout(): Promise<void> {
    await account.deleteSession("current");
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const res = await account.get();
      setUser(res);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// Wrap the UserProvider component around the root layout stack
