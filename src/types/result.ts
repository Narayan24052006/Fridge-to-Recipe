export interface Ingredient {
  item: string;
  amount: number | string;
  unit: string;
}

export interface Swap {
  original: string;
  alternative: string;
}

export interface Recipe {
  title: string;
  description: string;
  baseServings: number;
  ingredients: Ingredient[];
  steps: string[];
  swaps: Swap[];
}
