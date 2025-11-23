import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { usersRouter } from "./routers/users";
import { favoritesRouter } from "./routers/favorites";

export const app = new Elysia({
    prefix: "/api"
})
.use(productsRouter)
.use(usersRouter)
.use(favoritesRouter)