import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

// Custom hook to use the UserContext
// export function useUser(): UserContextType {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }