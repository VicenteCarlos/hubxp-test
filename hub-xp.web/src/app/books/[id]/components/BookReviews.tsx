import { Star } from "lucide-react";
import { useState } from "react";
import { useReviewCount } from "@/networking/hooks/books/useReviewCount";
import { ReviewModal } from "../../../../../components/ReviewModal";

interface BookReviewsProps {
  id: string;
  name: string;
  avaliation: number;
  reviewCount: number;
}

export function BookReviews({
  id,
  name,
  avaliation,
  reviewCount,
}: BookReviewsProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { submitReview, isSubmitting } = useReviewCount();

  const handleReview = (rating: number) => {
    submitReview(
      {
        bookId: id,
        review: { reviewCount: +rating },
      },
      {
        onSuccess: () => setIsReviewOpen(false),
      }
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        <button
          onClick={() => setIsReviewOpen(true)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white"
        >
          Adicionar review
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
            />
          ))}
        </div>
        <span className="text-zinc-400">({avaliation.toFixed(1)})</span>
        <span className="mx-2 text-zinc-600">|</span>
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">
          {reviewCount} avaliações
        </span>
      </div>

      <ReviewModal
        book={{ id, name, avaliation }}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmitReview={handleReview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
