import * as Dialog from '@radix-ui/react-dialog'
import { Star, X } from 'lucide-react'

interface ReviewModalProps {
  book: {
    id: string;
    name: string;
    avaliation: number;
  };
  isOpen: boolean
  onClose: () => void
  onSubmitReview: (rating: number) => void
  isSubmitting: boolean
}

export function ReviewModal({ 
  book, 
  isOpen, 
  onClose, 
  onSubmitReview,
  isSubmitting 
}: ReviewModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
        
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#111111] rounded-lg w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-semibold text-white">
                Avaliar "{book.name}"
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Escolha uma nota de 1 a 5 estrelas para este livro.
              </p>

              <div className="flex justify-center gap-2 py-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    disabled={isSubmitting}
                    onClick={() => onSubmitReview(rating)}
                    className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
                      rating <= book.avaliation ? 'text-yellow-500' : 'text-zinc-400'
                    }`}
                  >
                    <Star className="w-6 h-6" />
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 