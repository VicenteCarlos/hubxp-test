import { api } from '../../api'
import { Book } from '../../../shared/types/Book'

interface CreateBookResponse {
  data: Book
}

interface GetBooksResponse {
  data: Book[]
  meta: {
    total: number
    page: number
    totalPages: number
  }
}

interface GetBookResponse {
  data: Book
}

interface TopBooksResponse {
  data: (Book & {
    avgRating: number;
    reviewCount: number;
  })[];
}

export const getBooks = async (params: {
  page?: number
  limit?: number
  name?: string
  author?: string
  avaliation?: number
}) => {
  const response = await api.get<GetBooksResponse>('/books', { params })
  return response.data
}

export const getBookById = async (id: string) => {
  const response = await api.get<GetBookResponse>(`/books/${id}`)
  return response.data
}

export const createBook = async (data: {
  name: string
  author: string
  avaliation: number
  description: string
}) => {
  const response = await api.post<CreateBookResponse>('/books', data)
  return response.data
}

export const updateBook = async (id: string, data: {
  name?: string
  author?: string
  avaliation?: number
  description?: string
}) => {
  const response = await api.put<GetBookResponse>(`/books/${id}`, data)
  return response.data
}

export const deleteBook = async (id: string) => {
  const response = await api.delete<void>(`/books/${id}`)
  return response.data
}

export const getTopBooks = async (limit?: number) => {
  const response = await api.get<TopBooksResponse>('/books/top', {
    params: { limit }
  })
  return response.data
} 