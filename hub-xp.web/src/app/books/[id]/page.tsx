"use client";

import { notFound } from "next/navigation";
import { BookDetails } from "./components/BookDetails";
import { useBook } from "@/networking/hooks/books/useBook";

export default function BookPage({ params }: { params: { id: string } }) {
  const { data: book, isLoading, error } = useBook(params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-8 flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  if (error || !book) {
    notFound();
  }

  return <BookDetails book={book} />;
}
