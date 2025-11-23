import Elysia from "elysia";
import { isNull, eq } from "drizzle-orm";
import { db } from "../../db";
import { products } from "../../db/schema";
import z from "zod";

export const productsRouter = new Elysia({
    prefix: "/products"
})
.get("/", async () => {
    return await db.query.products.findMany({
        where: isNull(products.deletedAt)
    })
})
.get("/:id", async ({params}) => {
    return await db.query.products.findFirst({
        where: eq(products.id, params.id)
    })
}, {
    params: z.object({
        id: z.string()
    })
})

//Пример запроса http://localhost:3000/api/products/search?input=iPhone
//Вернет объекты у которых title содержит iPhone (например Apple iPhone 15, Iphone 11 pro max и тд)

// .get("/search", async ({ query}) => {
//     return await db.query.products.findMany({
//         where: ilike(products.title, `%${query.input}%`)
//     })
// }, {
//     query: z.object({
//         input: z.string()
//     })
// })