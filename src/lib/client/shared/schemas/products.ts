import z from "zod/v4";

export const productSchema = z.object({
    imageUrl: z.url(),
    title: z.string().min(3, "Minimum title length is 3"),
    description: z.string(),
    price: z.number().min(10, "Minimum price is 10")
})