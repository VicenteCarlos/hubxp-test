import type React from "react"
import { X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  description?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, description }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-6 bg-[#111111] border-[#222222] shadow-lg custom-scrollbar transform transition-all duration-200 hover:scale-[1.02]">
        <div className="absolute right-4 top-4">
          <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:bg-[#2a2a2a] p-1">
            <X className="h-4 w-4 text-zinc-400" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl text-white font-medium">{title}</DialogTitle>
          {description && <p className="text-sm text-zinc-400 mt-2">{description}</p>}
        </DialogHeader>
        <div className="mt-6">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
