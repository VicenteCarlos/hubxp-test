'use client'

import { useBooks } from '@/network/hooks/books/useBooks'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const searchSchema = yup.object({
  name: yup.string(),
  author: yup.string(),
})

type SearchFormData = yup.InferType<typeof searchSchema>

export function BookList() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10
  const name = searchParams.get('name') || ''
  const author = searchParams.get('author') || ''

  const { data, isLoading } = useBooks({ page, limit, name, author })

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      name,
      author,
    },
  })

  const onSubmit = (formData: SearchFormData) => {
    const params = new URLSearchParams()
    if (formData.name) params.set('name', formData.name)
    if (formData.author) params.set('author', formData.author)
    window.location.search = params.toString()
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar por nome"
          className="border p-2 rounded"
          {...register('name')}
        />
        <input
          type="text"
          placeholder="Buscar por autor"
          className="border p-2 rounded"
          {...register('author')}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-yellow-500">{'⭐'.repeat(book.avaliation)}</p>
            <p className="mt-2">{book.description}</p>
          </div>
        ))}
      </div>

      {data?.meta && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: data.meta.totalPages }, (_, i) => (
            <a
              key={i + 1}
              href={`?page=${i + 1}&limit=${limit}${name ? `&name=${name}` : ''}${
                author ? `&author=${author}` : ''
              }`}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  )
} 