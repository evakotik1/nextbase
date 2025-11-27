import { eq, ilike, isNull } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod/v4";
import { userServise } from "./user";
import { products } from "../../db/schema";
import { db } from "../../db";
import { productSchema } from "@/src/lib/client/shared/schemas/products";

export const productsRouter = new Elysia({
    prefix: "/products"
})
.use(userServise)
.get("/", async () => {
    return await db.query.products.findMany({
        where: isNull(products.deletedAt)
    })
})
.get("/:id", async ({ params }) => {
    return await db.query.products.findFirst({
        where: eq(products.id, params.id)
    })
}, {
    params: z.object({
        id: z.string()
    }),
})
.get("/search", async ({ query}) => {
    return await db.query.products.findMany({ 
        where: ilike(products.title, `%${query.input}%`)
    })
}, {
    query: z.object({
        input: z.string()
    })
})
.post("/", async ({body}) => {
    return await db.insert(products).values(body).returning()
}, {
    body: productSchema
})
.put("/:id", async ({params, body}) => {
    return await db.update(products).set(body).where(eq(products.id, params.id)).returning()
}, {
    body: productSchema,
    params: z.object({
        id: z.string()
    })
})