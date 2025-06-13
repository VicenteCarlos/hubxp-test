import { Star, Trash2, Edit } from 'lucide-react'

interface Book {
  id: string
  name: string
  author: string
  coverUrl: string
  description: string
  rating: number
}

interface BookCardProps {
  book: Book
  onUpdate: () => void
  onDelete: () => void
}

export function BookCard({ book, onUpdate, onDelete }: BookCardProps) {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const filled = index < Math.floor(book.rating)
    const halfFilled = !filled && index < book.rating

    return (
      <Star
        key={index}
        className={`w-4 h-4 ${
          filled
            ? 'text-yellow-400 fill-yellow-400'
            : halfFilled
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-gray-400'
        }`}
      />
    )
  })

  const handleClick = (e: React.MouseEvent) => {
    // Previne a navegação quando clicar nos botões
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault()
    }
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-[#2a2a2a] rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{book.name}</h3>
        <p className="text-gray-400 text-sm mb-2">{book.author}</p>
        
        <div className="flex items-center gap-1 mb-4">
          {stars}
          <span className="text-sm text-gray-400 ml-2">
            {book.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {book.description}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onUpdate}
            className="p-2 rounded-md bg-[#111111] text-white hover:opacity-80 transition-opacity duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 rounded-md bg-red-600 text-white hover:opacity-80 transition-opacity duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 