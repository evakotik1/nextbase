import { users } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function getUsersWithFavorites() {
    const users = await db.query.users.findMany({
        with: {
            favorites: {
                with: {
                    product: true
                }
            }
        }
    })
    return users
};