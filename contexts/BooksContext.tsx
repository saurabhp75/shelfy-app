import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { client, databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

// Define book type
export interface Book {
  $id: string;
  title: string;
  author: string;
  description?: string;
  userId: string;
  $createdAt: string;
  $updatedAt: string;
}

// Define context type
export interface BooksContextType {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<Book | undefined>;
  createBook: (
    data: Omit<Book, "$id" | "userId" | "$createdAt" | "$updatedAt">
  ) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useUser();

  async function fetchBooks(): Promise<void> {
    try {
      if (!user) return;
      const response = await databases.listDocuments(
        process.env.EXPO_PUBLIC_SHELFY_DB_ID!,
        process.env.EXPO_PUBLIC_BOOKS_COLLECTION_ID!,
        [Query.equal("userId", user.$id)]
      );
      setBooks(response.documents as unknown as Book[]);
      console.dir(response.documents);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "An error occurred");
    }
  }

  async function fetchBookById(id: string): Promise<Book | undefined> {
    try {
      const response = await databases.getDocument(
        process.env.EXPO_PUBLIC_SHELFY_DB_ID!,
        process.env.EXPO_PUBLIC_BOOKS_COLLECTION_ID!,
        id
      );
      return response as unknown as Book;
    } catch (error) {
      console.log(error instanceof Error ? error.message : "An error occurred");
      return undefined;
    }
  }

  async function createBook(
    data: Omit<Book, "$id" | "userId" | "$createdAt" | "$updatedAt">
  ): Promise<void> {
    try {
      if (!user) return;
      await databases.createDocument(
        process.env.EXPO_PUBLIC_SHELFY_DB_ID!,
        process.env.EXPO_PUBLIC_BOOKS_COLLECTION_ID!,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      await fetchBooks(); // Refresh the books list
    } catch (error) {
      console.log(error instanceof Error ? error.message : "An error occurred");
    }
  }

  async function deleteBook(id: string): Promise<void> {
    try {
      await databases.deleteDocument(
        process.env.EXPO_PUBLIC_SHELFY_DB_ID!,
        process.env.EXPO_PUBLIC_BOOKS_COLLECTION_ID!,
        id
      );
      await fetchBooks(); // Refresh the books list
    } catch (error) {
      console.log(error instanceof Error ? error.message : "An error occurred");
    }
  }

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const channel = `databases.${process.env
      .EXPO_PUBLIC_SHELFY_DB_ID!}.collections.${process.env
      .EXPO_PUBLIC_BOOKS_COLLECTION_ID!}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;
        // console.log(events);

        if (events[0].includes("create")) {
          setBooks((prevBooks) => [...prevBooks, payload as unknown as Book]);
        }

        if (events[0].includes("delete")) {
          setBooks((prevBooks) =>
            prevBooks.filter(
              (book) => book.$id !== (payload as unknown as Book).$id
            )
          );
        }
      });
    } else {
      setBooks([]);
    }

    // Clenup subscription on unmount or when user changes
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}

// Custom hook to use the BooksContext
export function useBooks(): BooksContextType {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}
