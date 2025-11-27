import { eq, ilike, isNull } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod/v4";
import { userServise } from "./user";
import { db } from "../../db";
import { user } from "../../db/auth-schema";

export const adminRouter = new Elysia({
    prefix: "/admin"
})
.use(userServise)

.get("/users", async () => {
    return await db.query.user.findMany({
        where: isNull(user.deletedAt)
    })
}, {
    whichRole: "admin"
})

.delete("/users/:id", async ({ params }) => {
    return await db.delete(user).where(eq(user.id, params.id)).returning()
}, {
    whichRole: "admin"
})
