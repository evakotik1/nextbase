import Elysia from "elysia";
import { isNull, eq, and } from "drizzle-orm";
import { db } from "../../db";
import { favorites } from "../../db/schema";
import { favoritesSchema } from "@/src/lib/client/shared/schemas/favorites"; 
import z from "zod/v4";
import { userServise } from "./user";

export const favoritesRouter = new Elysia({
    prefix: "/favorites"
})
.use(userServise)
.get("/my-favorites", async ({session}) => {
    return await db.query.favorites.findMany({
        where: and(
            eq(favorites.userId, session!.user.id),
            isNull(favorites.deletedAt)
        ),
        // with: {
        //     product: true
        // }
    })
}, {
    isSignedIn: true,
})

.get("/:userId", async ({params}) => {
    return await db.query.favorites.findMany({
        where: and(
            eq(favorites.userId, params.userId),
            isNull(favorites.deletedAt)
        ),
        with: {
            product: true
        }
    })
}, {
    params: z.object({
        userId: z.string()
    })
})
.post("/", async ({ body }) => {
    return await db.insert(favorites).values(body).returning()
}, {
    body: favoritesSchema
})
.put("/:id", async ({ params, body }) => {
    return await db.update(favorites).set(body).where(eq(favorites.id, params.id)).returning()
}, {
    body: favoritesSchema,
    params: z.object({
        id: z.string()
    })
});