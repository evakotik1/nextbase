import z from "zod/v4";

export const favoritesSchema = z.object({
    userId: z.string(),
	productId: z.string(),
    addedAt: z.date().optional()
})