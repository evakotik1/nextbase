import { integer, pgTable, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";


export const commonFields = {
	id: varchar("id", { length: 255 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),

	deletedAt: timestamp("deleted_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const users = pgTable("users", {
	// id: varchar({length: 255}).primaryKey().notNull().$defaultFn(() => Bun.randomUUIDv7()),
	...commonFields,
	name: varchar({length: 255}).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	birthDate: timestamp("birth_date"),
})

export const usersRelations = relations(users, ({ many }) => ({
	favorites: many(favorites),
	cart: many(cart),
}));



export const products = pgTable("products", {
	...commonFields,
	imageUrl: text("image_url"),
	title: varchar({length: 255}).notNull(),
	description: text("description"), 
	createdAt: timestamp("created_at").defaultNow(),
	deletedAt: timestamp("deleted_at"),
});

export const productsRelations = relations(products, ({ many }) => ({
	favorites: many(favorites),
	cart: many(cart),
}));




export const favorites = pgTable("favorites", {
	...commonFields,
	userId: varchar("user_id",{length: 255}).notNull().references(() => users.id),
	productId: varchar("product_id",{length: 255}).notNull().references(() => products.id),
	addedAt:  timestamp("added_at").defaultNow()
})

export const favoritesRelations = relations(favorites, ({ one }) => ({
	user: one(users, {
		fields: [favorites.userId],
		references: [users.id]
	}),

	product: one(products, {
		fields: [favorites.productId],
		references: [products.id],
	}),
}));




export const cart = pgTable("cart", {
	...commonFields,
	userId: varchar("user_id",{length: 255}).notNull().references(() => users.id),
	productId: varchar("product_id",{length: 255}).notNull().references(() => products.id),
	quantity: integer("quantity").notNull()
})

export const cartRelations = relations(cart, ({ one }) => ({
	user: one(users, {
		fields: [cart.userId],
		references: [users.id]
	}),
	
	product: one(products, {
		fields: [cart.productId],
		references: [products.id],
	}),
}));