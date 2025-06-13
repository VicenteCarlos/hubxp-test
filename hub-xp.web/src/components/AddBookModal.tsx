"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createBookSchema,
  CreateBookFormData,
} from "@/shared/schemas/book.schema";
import { useCreateBook } from "@/network/hooks/books/useBooks";
import { X } from "lucide-react";
import Modal from "./Modal";
import { Book } from "@/shared/types/Book";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const { mutateAsync: createBook, isPending } = useCreateBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookFormData>({
    resolver: yupResolver(createBookSchema),
  });

  const onSubmit = async (data: CreateBookFormData) => {
    await createBook(data as Omit<Book, "id" | "created_at" | "updated_at">);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Livro">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nome do livro"
            className="w-full px-4 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-zinc-400 placeholder:text-zinc-600"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Autor"
            className="w-full px-4 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-zinc-400 placeholder:text-zinc-600"
            {...register("author")}
          />
          {errors.author && (
            <span className="text-red-500 text-sm">
              {errors.author.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Avaliação (0-5)"
            className="w-full px-4 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-zinc-400 placeholder:text-zinc-600"
            {...register("avaliation")}
          />
          {errors.avaliation && (
            <span className="text-red-500 text-sm">
              {errors.avaliation.message}
            </span>
          )}
        </div>

        <div>
          <textarea
            placeholder="Descrição"
            className="w-full px-4 py-2 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[100px] text-zinc-400 placeholder:text-zinc-600"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-white text-black rounded-md hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Adicionando..." : "Adicionar Livro"}
        </button>
      </form>
    </Modal>
  );
}
