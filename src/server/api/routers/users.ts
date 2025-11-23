import Elysia from "elysia";
import { isNull, eq, lte, and } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import z from "zod";

export const usersRouter = new Elysia({
    prefix: "/users"
})
.get("/:id", async ({params}) => {
    return await db.query.users.findFirst({
        where: eq(users.id, params.id)
    })
}, {
    params: z.object({
        id: z.string()
    })
})

.get("/", async () => {
    return await db.query.users.findMany({
        where: isNull(users.deletedAt)
    })
})

.get('/adult', async () => {
    const eighteenYears = new Date();
    eighteenYears.setFullYear(eighteenYears.getFullYear() - 18);

    return await db.query.users.findMany({
        where: and(
            isNull(users.deletedAt),
            lte(users.birthDate, eighteenYears)
        )
    })
})