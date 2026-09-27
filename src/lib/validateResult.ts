import { z } from 'zod';
import type { Recipe } from '../types/result';

const IngredientSchema = z.object({
  item: z.string(),
  amount: z.union([z.number(), z.string()]),
  unit: z.string(),
});

const SwapSchema = z.object({
  original: z.string(),
  alternative: z.string(),
});

const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  baseServings: z.number().int().positive(),
  ingredients: z.array(IngredientSchema),
  steps: z.array(z.string()),
  swaps: z.array(SwapSchema).optional().default([]),
});

export function parseResult(raw: string): Recipe | null {
  try {
    const parsedJson = JSON.parse(raw);
    
    // Zod validation against the schema
    const result = RecipeSchema.safeParse(parsedJson);
    
    if (result.success) {
      return result.data as Recipe;
    }
    
    console.error("Validation failed:", result.error);
    return null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null; // Malformed JSON
  }
}
