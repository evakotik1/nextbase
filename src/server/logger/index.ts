import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { cart, favorites, products, users } from "../db/schema";


export async function createUser(name: string, email:string, birthDate: Date) {
    const created = await db.insert(users).values({
        name: name,
        email: email,
        birthDate: birthDate
    }).returning()
    return created[0]
}

export async function getUsers() {
    return await db.select().from(users)
}
export async function deleteUser(userId: string) {
    const deleted = await db.delete(users).where(eq(users.id, userId)).returning()
    return deleted[0]
}

export async function updateUser(userId: string, updateData: {name?: string, email?: string, birthDate?: Date}) {
    const updated = await db.update(users).set(updateData).where(eq(users.id, userId)).returning()
    return updated[0]
}





export async function createProduct(imageUrl:string, title:string, description: string) {
    const created = await db.insert(products).values({
        imageUrl: imageUrl,
        title: title,
        description: description
    }).returning()
    return created[0]
}


export async function getProducts() {
    return await db.query.products.findMany({
        where: isNull(products.deletedAt)
    })
}

export async function deleteProduct(productId: string) {
    // const deleted = await db.delete(products).where(eq(products.id, productId)).returning()
    const deleted = await db.update(products).set({deletedAt: new Date()}).where(eq(products.id, productId)).returning()
    return deleted[0]
}

export async function updateProduct(productId: string, updateData: {imageUrl?: string, title?: string, description?: string}) {
    const updated = await db.update(products).set(updateData).where(eq(products.id, productId)).returning()
    return updated[0]
}





export async function addToFavorites(userId: string, productId: string) {
    const created = await db.insert(favorites).values({
        userId: userId,
        productId: productId
    }).returning()
    return created[0]
}

export async function getFavorites() {
    return await db.select().from(favorites)
} 

export async function getUserFavorites(userId: string) {
    return await db.select().from(favorites).where(eq(favorites.userId, userId))
}

export async function removeFromFavorites(userId: string, productId: string) {
    const deleted = await db.delete(favorites).where(and(
        eq(favorites.userId, userId),
        eq(favorites.productId, productId)
    )).returning()
    return deleted[0]
}






export async function addToCart(userId: string, productId: string, quantity: number) {
    const created = await db.insert(cart).values({
        userId: userId,
        productId: productId,
        quantity: quantity
    }).returning()
    return created[0]
}

export async function getCart() {
    return await db.select().from(cart)
} //????????

export async function getUserCart(userId: string) {
    return await db.select().from(cart).where(eq(cart.userId, userId))
}

export async function removeFromCart(userId: string, productId: string) {
    const deleted = await db.delete(cart).where(and(
        eq(cart.userId, userId),
        eq(cart.productId, productId)
    )).returning()
    return deleted[0]
}







// Чтобы сгенерировать файлы схемы нужно написать
// // bunx drizzle-kit generate
// // После этого чтобы применить изменения в БД нужно написать
// // bunx drizzle-kit migrate

// async function basicOperations() {
// 	// Вставка записи
// 	// await db.insert(requests).values({
// 	// 	description: "HEllo",
// 	// 	phoneNumber: "1234567890",
// 	// 	name: "John Doe",
// 	// });
// 	// Вставка записи и чтобы оно вернуло данные
// 	// const [newRequest] = await db
// 	// 	.insert(requests)
// 	// 	.values({
// 	// 		description: "HEllo",
// 	// 		phoneNumber: "1234567890",
// 	// 		name: "John Doe",
// 	// 	})
// 	// 	.returning();
// 	// console.log(newRequest);
// 	// Вставка нескольких записей
// 	// await db.insert(requests).values([
// 	// 	{
// 	// 		description: "HEllo",
// 	// 		phoneNumber: "1234567890",
// 	// 		name: "John Doe",
// 	// 	},
// 	// 	{
// 	// 		description: "asbdfabsdfj",
// 	// 		phoneNumber: "13q242134",
// 	// 		name: "asfdbasdbjfas",
// 	// 	},
// 	// ]);
// 	// Получение данных с фильтрами
// 	// const reqs = await db.query.requests.findMany({
// 	// 	where: and(
// 	// 		eq(requests.name, "John Doe"),
// 	// 		eq(requests.phoneNumber, "1234567890"),
// 	// 	),
// 	// });
// 	// console.log(reqs);
// 	//
// 	// const req = await db.query.requests.findFirst({
// 	// 	where: eq(requests.id, "0199cd6e-1da5-7000-b027-6a49b708dd5a"),
// 	// });
// 	// console.log({ req });
// 	// Обновление данных
// 	// await db
// 	// 	.update(requests)
// 	// 	.set({
// 	// 		name: "asdfadsfsaddf123",
// 	// 	})
// 	// 	.where(eq(requests.id, "0199cd6e-1da5-7000-b027-6a49b708dd5a"));
// 	// Удаление данных
// 	// await db
// 	// 	.delete(requests)
// 	// 	.where(eq(requests.id, "0199cd6e-1da5-7000-b027-6a49b708dd5a"));
// }

// async function relationsFunctions() {
// 	// Создаем менеджера с связанными запросами
// 	// const [manager] = await db
// 	// 	.insert(managers)
// 	// 	.values({
// 	// 		name: "Ivan",
// 	// 		email: "ivan1996_rus@gmail.com",
// 	// 	})
// 	// 	.returning();
// 	//
// 	// for (let i = 0; i < 10; i++) {
// 	// 	await db.insert(requests).values({
// 	// 		description: `${i}-description`,
// 	// 		phoneNumber: `${i}-phoneNumber`,
// 	// 		name: `${i}-name`,
// 	// 		managerId: manager!.id,
// 	// 	});
// 	// }
// 	// Получаем менеджера вместе с связанными с ним запросами
// 	// const a = await db.query.managers.findMany({
// 	// 	with: {
// 	// 		requests: true,
// 	// 	},
// 	// });
// 	//
// 	// console.log(a, { depth: null });
// 	// Получаем запросы вместе с менеджером
// 	// const a = await db.query.requests.findMany({
// 	// 	with: {
// 	// 		manager: true,
// 	// 	},
// 	// });
// 	// console.log(a, { depth: null });
// }

// async function main() {
// 	await relationsFunctions();
// }

// main()
// 	.then(() => process.exit(0))
// 	.catch((e) => {
// 		console.error(e);
// 		process.exit(1);
// 	});