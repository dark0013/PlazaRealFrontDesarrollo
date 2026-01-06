export interface Category {
  id?: number;
  name: string;
  description?: string;
  minimum_age?: number;
  maximum_age?: number;
  applicable_genre?: string;
  status: string;
}
