export interface Food {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isAvailable: boolean;
}

export interface FoodInput {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
