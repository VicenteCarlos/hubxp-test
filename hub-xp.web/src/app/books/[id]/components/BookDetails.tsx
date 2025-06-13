"use client"

import Image from "next/image";
import { useState } from "react";
import { Book } from "@/shared/types/Book";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BookReviews } from "./BookReviews";

interface BookDetailsProps {
  book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
  const [imageError, setImageError] = useState(false);
  const defaultCover = '/images/default-book-cover.png';


  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="max-w-7xl mx-auto px-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative w-full md:w-[300px] h-[450px] bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={!imageError ? book.coverUrl || defaultCover : defaultCover}
              alt={book.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover object-center"
              onError={() => setImageError(true)}
              priority
              quality={100}
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-3">{book.name}</h1>
            <p className="text-lg text-zinc-400 mb-5">por {book.author}</p>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(book.avaliation)
                        ? "text-yellow-400"
                        : "text-zinc-700"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-zinc-400">({book.avaliation})</span>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8">
              <p className="text-zinc-300 leading-relaxed">{book.description}</p>
            </div>

            <BookReviews 
              id={book.id}
              name={book.name}
              avaliation={book.avaliation} 
              reviewCount={book.reviewCount} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 