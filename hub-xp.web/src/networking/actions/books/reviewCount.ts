import { api } from "@/network/api";
import {  ReviewCountResponse } from "@/shared/types/Review";
 
export async function createReviewCount(bookId: string, review: ReviewCountResponse): Promise<ReviewCountResponse> {
  const response = await api.post<ReviewCountResponse>(`/books/reviewCount/${bookId}`, review);
  return response.data;
} 