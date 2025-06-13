import { useQuery } from '@tanstack/react-query';
import { getBookById } from '@/network/actions/books/actionBooks';

export function useBook(id: string) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await getBookById(id);
      return response.data;
    },
  });
} 