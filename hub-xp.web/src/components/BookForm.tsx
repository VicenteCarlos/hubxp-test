"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"

interface Book {
  id?: string
  title: string
  author: string
  coverUrl: string
  description: string
  rating?: number
}

interface BookFormProps {
  onSubmit: (data: Book) => void
  initialData?: Book
  onCancel?: () => void
}

const schema = yup
  .object({
    title: yup.string().required("Campo obrigatório"),
    author: yup.string().required("Campo obrigatório"),
    coverUrl: yup.string().url("URL inválida").required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
  })
  .required()

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Book>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm text-white">
          Nome
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Digite o nome do livro"
          className="h-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#1a1a1a]"
        />
        {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author" className="text-sm text-white">
          Autor
        </Label>
        <Input
          id="author"
          {...register("author")}
          placeholder="Digite o nome do autor"
          className="h-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#1a1a1a]"
        />
        {errors.author && <p className="text-xs text-red-400">{errors.author.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverUrl" className="text-sm text-white">
          URL da Capa
        </Label>
        <Input
          id="coverUrl"
          type="url"
          {...register("coverUrl")}
          placeholder="https://exemplo.com/imagem.jpg"
          className="h-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#1a1a1a]"
        />
        {errors.coverUrl && <p className="text-xs text-red-400">{errors.coverUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm text-white">
          Descrição
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Digite a descrição do livro"
          className="min-h-[80px] bg-[#1a1a1a] border-[#333333] text-white placeholder:text-zinc-600 resize-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#1a1a1a]"
        />
        {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
      </div>

      <div className="flex items-center justify-end gap-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-9 px-4 bg-[#1a1a1a] text-white border-[#333333] hover:bg-[#2a2a2a] hover:text-white"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-9 px-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

export default BookForm
