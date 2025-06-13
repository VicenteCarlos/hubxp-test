import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getTopBooks,
  updateBook,
} from "../../actions/books/actionBooks";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Book } from "@/shared/types/Book";
import { api } from "../../api";

interface BooksResponse {
  data: Book[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

interface TopBooksResponse {
  data: (Book & {
    avgRating: number;
    reviewCount: number;
  })[];
}

interface BookResponse {
  data: Book;
}

export function useBooks(params?: {
  page?: number;
  limit?: number;
  name?: string;
  author?: string;
}) {
  const query = useQuery<BooksResponse>({
    queryKey: ["books", params],
    queryFn: async () => await getBooks(params || {}),
  });

  return query;
}

export function useBook(id: string) {
  return useQuery<BookResponse>({
    queryKey: ["book", id],
    queryFn: async () => await getBookById(id),
    enabled: !!id,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      data: Omit<Book, "id" | "created_at" | "updated_at">
    ): Promise<BookResponse> => await createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: { id: string } & Partial<
      Omit<Book, "id" | "created_at" | "updated_at">
    >) => await updateBook(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", variables.id] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro excluído com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao excluir livro");
      } else {
        toast.error("Erro ao excluir livro");
      }
    },
  });
}

export function useBestRatedBooks(params?: { page?: number; limit?: number }) {
  const query = useQuery<BooksResponse>({
    queryKey: ["best-rated-books", params],
    queryFn: async () => {
      const response = await api.get<BooksResponse>("/books/reviews", {
        params,
      });
      return response.data;
    },
  });

  return query;
}

export function useTopBooks(limit?: number) {
  return useQuery<TopBooksResponse>({
    queryKey: ["top-books", limit],
    queryFn: async () => await getTopBooks(limit),
  });
}
