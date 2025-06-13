import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReviewCount } from '@/networking/actions/books/reviewCount';
import { ReviewCountResponse } from '@/shared/types/Review';
import { toast } from 'react-toastify';

export function useReviewCount() {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async ({ bookId, review }: { bookId: string; review: ReviewCountResponse }) => {
      return await createReviewCount(bookId, review);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', variables.bookId] });
      toast.success('Avaliação enviada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao enviar avaliação. Tente novamente.');
    },
  });

  return {
    submitReview,
    isSubmitting: isPending,
  };
} 