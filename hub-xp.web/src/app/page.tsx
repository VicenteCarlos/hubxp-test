"use client";

import { useState } from "react";
import { BookCard } from "@/components/BookCard";
import { UpdateBookModal } from "@/components/UpdateBookModal";
import { AddBookModal } from "@/components/AddBookModal";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import {
  useBooks,
  useDeleteBook,
  useBestRatedBooks,
} from "@/network/hooks/books/useBooks";
import { Book } from "@/shared/types/Book";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const [state, setState] = useState({
    searchTerm: searchParams.get("name") || "",
    showTopRated: false,
    selectedBook: null as Book | null,
    isUpdateModalOpen: false,
    isAddModalOpen: false,
  });

  const { data: normalData, isLoading: isLoadingNormal } = useBooks(
    state.searchTerm
      ? {
          page,
          limit: 10,
          name: state.searchTerm,
        }
      : {
          page,
          limit: 10,
        }
  );

  const { data: bestRatedData, isLoading: isLoadingBestRated } =
    useBestRatedBooks(
      state.showTopRated
        ? {
            page,
            limit: 10,
          }
        : undefined
    );

  const { mutateAsync: deleteBook } = useDeleteBook();

  const handleDeleteBook = async (book: Book) => await deleteBook(book.id);

  const data = state.showTopRated ? bestRatedData : normalData;
  const isLoading = state.showTopRated ? isLoadingBestRated : isLoadingNormal;
  const books = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (state.searchTerm) {
      params.set("name", state.searchTerm);
    } else {
      params.delete("name");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-8 flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Livraria HubXP</h1>
          <button
            onClick={() => setState({ ...state, isAddModalOpen: true })}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:opacity-80 transition-opacity duration-200"
          >
            <Plus className="w-5 h-5" />
            Adicionar Livro
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <input
              type="text"
              placeholder="Encontre o livro que você procura..."
              className="w-full px-4 py-2 bg-[#2a2a2a] rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
              value={state.searchTerm}
              onChange={(e) =>
                setState({ ...state, searchTerm: e.target.value })
              }
              disabled={state.showTopRated}
            />
            <button type="submit" className="absolute right-3 top-2.5">
              <Search className="text-gray-400" />
            </button>
          </form>

          <button
            onClick={() =>
              setState({
                ...state,
                showTopRated: !state.showTopRated,
                searchTerm: "",
              })
            }
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              state.showTopRated
                ? "bg-white text-black"
                : "bg-[#2a2a2a] text-white hover:opacity-80"
            }`}
          >
            Mais Bem Avaliados
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <BookCard
                book={book}
                onUpdate={() => {
                  setState({
                    ...state,
                    selectedBook: book,
                    isUpdateModalOpen: true,
                  });
                }}
                onDelete={() => handleDeleteBook(book)}
              />
            </Link>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            Nenhum livro encontrado
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/?page=${page - 1}${
                      state.searchTerm ? `&name=${state.searchTerm}` : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) handlePageChange(page - 1);
                    }}
                    className={
                      page <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= page - 1 && pageNumber <= page + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href={`/?page=${pageNumber}${
                            state.searchTerm ? `&name=${state.searchTerm}` : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                          }}
                          isActive={page === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (pageNumber === 2 && page > 3) ||
                    (pageNumber === totalPages - 1 && page < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    href={`/?page=${page + 1}${
                      state.searchTerm ? `&name=${state.searchTerm}` : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) handlePageChange(page + 1);
                    }}
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {state.selectedBook && (
        <UpdateBookModal
          book={state.selectedBook}
          isOpen={state.isUpdateModalOpen}
          onClose={() => {
            setState({
              ...state,
              selectedBook: null,
              isUpdateModalOpen: false,
            });
          }}
        />
      )}

      <AddBookModal
        isOpen={state.isAddModalOpen}
        onClose={() => setState({ ...state, isAddModalOpen: false })}
      />
    </div>
  );
}
