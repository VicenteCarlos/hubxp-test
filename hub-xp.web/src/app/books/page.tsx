import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBooks } from '@/network/actions/books/actionBooks'
import { BookList } from './components/BookList'

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; name?: string; author?: string }
}) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['books', searchParams],
    queryFn: async () =>
      await getBooks({
        page: searchParams.page ? parseInt(searchParams.page) : 1,
        limit: searchParams.limit ? parseInt(searchParams.limit) : 10,
        name: searchParams.name,
        author: searchParams.author,
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Livros</h1>
        <BookList />
      </div>
    </HydrationBoundary>
  )
} 