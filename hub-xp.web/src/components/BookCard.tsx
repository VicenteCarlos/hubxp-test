import { Book } from '@/shared/types/Book'
import { Edit3, Star, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useReviewCount } from '@/networking/hooks/books/useReviewCount'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { useState } from 'react'
import { ReviewModal } from '../../components/ReviewModal'

interface BookCardProps {
  book: Book
  onUpdate: () => void
  onDelete: () => void
}

export function BookCard({ book, onUpdate, onDelete }: BookCardProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const { submitReview, isSubmitting } = useReviewCount()

  const handleReview = (rating: number) => {
    submitReview(
      { 
        bookId: book.id, 
        review: { reviewCount: rating } 
      },
      {
        onSuccess: () => setIsReviewOpen(false)
      }
    )
  }

  return (
    <div className="bg-[#2a2a2a] rounded-lg overflow-hidden hover:ring-2 hover:ring-white/20 transition-all duration-200 hover:scale-[1.02] h-[500px] flex flex-col">
      <div className="relative h-[300px] bg-gray-800 flex-shrink-0">
        <Image
          src={book.coverUrl || '/images/default-book-cover.png'}
          alt={book.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 text-white">{book.name}</h3>
            <p className="text-zinc-400 text-sm">{book.author}</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.preventDefault()
                onUpdate()
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                onDelete()
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>

        <p className="text-zinc-400 text-sm mt-2 line-clamp-3 flex-1">
          {book.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-zinc-400">{book.avaliation.toFixed(1)}</span>
          </div>
          <button
            onClick={() => setIsReviewOpen(true)}
            className="px-4 py-2 bg-[#2a2a2a] text-white rounded-md hover:bg-[#3a3a3a] transition-colors"
          >
            Adicionar review
          </button>
        </div>
      </div>

      <ReviewModal
        book={book}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmitReview={handleReview}
        isSubmitting={isSubmitting}
      />
    </div>
  )
} 