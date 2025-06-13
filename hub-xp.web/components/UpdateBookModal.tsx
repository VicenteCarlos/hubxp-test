import { Dialog } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface Book {
  id: string
  name: string
  author: string
  coverUrl: string
  description: string
  rating: number
}

interface UpdateBookModalProps {
  book: Book
  isOpen: boolean
  onClose: () => void
}

export function UpdateBookModal({ book, isOpen, onClose }: UpdateBookModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/60 z-50" />
      
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#111111] rounded-lg w-full max-w-md p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Atualizar Livro
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Nome
              </label>
              <input
                type="text"
                defaultValue={book.name}
                className="w-full px-3 py-2 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Autor
              </label>
              <input
                type="text"
                defaultValue={book.author}
                className="w-full px-3 py-2 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                URL da Capa
              </label>
              <input
                type="text"
                defaultValue={book.coverUrl}
                className="w-full px-3 py-2 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Descrição
              </label>
              <textarea
                defaultValue={book.description}
                rows={3}
                className="w-full px-3 py-2 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Avaliação
              </label>
              <input
                type="number"
                defaultValue={book.rating}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-3 py-2 bg-[#2a2a2a] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-md hover:opacity-80 transition-opacity duration-200"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
} 