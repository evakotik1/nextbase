import { eq } from 'drizzle-orm';
import { db } from '../db';
import { cart, favorites } from '../db/schema';
import { getUsersWithFavorites } from './getUsers';
import { createUser, getUsers, updateUser, deleteUser, 
    createProduct, getProducts, updateProduct, deleteProduct,
    addToFavorites, getUserFavorites, removeFromFavorites, getFavorites, 
    addToCart, getUserCart, removeFromCart, getCart } from './index';

    async function TestFiveData() {
        console.log('=== ТЕСТ 5x5 ===\n');
        
        const user1 = await createUser("Алексей", "alex@mail.com", new Date("1990-01-01"));
        const user2 = await createUser("Мария", "maria@mail.com", new Date("1995-02-02"));
        const user3 = await createUser("Иван", "ivan@mail.com", new Date("1988-03-03"));
        const user4 = await createUser("Ольга", "olga@mail.com", new Date("1992-04-04"));
        const user5 = await createUser("Дмитрий", "dmitry@mail.com", new Date("1993-05-05"));
        
        const product1 = await createProduct("tshirt.jpg", "Футболка", "Черная футболка", 1990);
        const product2 = await createProduct("jeans.jpg", "Джинсы", "Синие джинсы", 4990);
        const product3 = await createProduct("jacket.jpg", "Куртка", "Кожаная куртка", 12990);
        const product4 = await createProduct("shoes.jpg", "Кроссовки", "Белые кроссовки", 8990);
        const product5 = await createProduct("hat.jpg", "Кепка", "Красная кепка", 1490);
        
        console.log('Создано 5 пользователей и 5 товаров\n');
        
        await addToFavorites(user1.id, product1.id);
        await addToFavorites(user1.id, product2.id);
        await addToFavorites(user2.id, product3.id);
        await addToFavorites(user3.id, product4.id);
        await addToFavorites(user4.id, product5.id);
        await addToFavorites(user5.id, product1.id);
        
        console.log('Добавлено 6 избранных товаров\n');
        
        await addToCart(user1.id, product1.id, 2);
        await addToCart(user2.id, product2.id, 1);
        await addToCart(user3.id, product3.id, 3);
        await addToCart(user4.id, product4.id, 1);
        await addToCart(user5.id, product5.id, 2);
        
        console.log('Добавлено 5 товаров в корзину\n');
        
        const allUsers = await getUsers();
        const allProducts = await getProducts();
        const allFavorites = await getFavorites();
        const allCart = await getCart();
        
        console.log('');
        console.log(`Пользователей: ${allUsers.length}`);
        console.log(`Товаров: ${allProducts.length}`);
        console.log(`Избранных: ${allFavorites.length}`);
        console.log(`В корзине: ${allCart.length}`);
        
    }
    
    TestFiveData();

// async function TestAll() {

//     const testUser1 = await createUser("Иван Петров", "ivan1@gmail.com", new Date("1996-05-15"));
//     const testUser2 = await createUser("Мария Иванова", "maria1@gmail.com", new Date("1999-08-20"));
//     console.log('ID пользователей:', testUser1.id, testUser2.id);

//     const allUsers = await getUsers();
//     console.log('Всего пользователей:', allUsers.length);


//     const testProduct1 = await createProduct("Tshirt.jpg", "Футболка", "Крутая футболка");
//     const testProduct2 = await createProduct("pants.jpg", "Штаны", "Крутые штаны");
//     console.log('ID товаров:', testProduct1.id, testProduct2.id);

//     const allProducts = await getProducts();
//     console.log('Всего товаров:', allProducts.length);


//     await addToFavorites(testUser1.id, testProduct1.id);
//     await addToFavorites(testUser1.id, testProduct2.id);
//     await addToFavorites(testUser2.id, testProduct1.id);
//     console.log('Добавлено в избранное!');

//     const user1Favorites = await getUserFavorites(testUser1.id);
//     console.log('Избранное пользователя', testUser1.name + ':', user1Favorites.length, 'товар/ов');

//     const allFavorites = await getFavorites();
//     console.log('Всего товаров у людей в избранном:', allFavorites.length);


//     await addToCart(testUser1.id, testProduct1.id, 2);
//     await addToCart(testUser1.id, testProduct2.id, 1);
//     await addToCart(testUser2.id, testProduct1.id, 3);
//     console.log('Добавлено в корзину!');

//     const user1Cart = await getUserCart(testUser1.id);
//     console.log('Корзина пользователя', testUser1.name + ':', user1Cart.length, 'товаров');

//     const allCart = await getCart();
//     console.log('Всего товаров у людей в корзине:', allCart.length);


//     const usersWithFavorites = await getUsersWithFavorites() ;
//     usersWithFavorites.forEach((user, index) => {
//         if (user.favorites.length > 0) {
//             console.log(`${index + 1}. ${user.name}`);
//             console.log(`Избранных товаров: ${user.favorites.length}`);
            
//             user.favorites.forEach(fav => {
//                 console.log(`Товар: ${fav.product.title}`);
//                 console.log(`ID: ${fav.product.id}`);
//                 console.log(`Описание: ${fav.product.description}`);
//                 console.log(`Добавлен: ${fav.addedAt}`);
//             });
//             console.log()
//         }
//     });
//     const usersWithoutFavorites = usersWithFavorites.filter(user => user.favorites.length === 0);
//     if (usersWithoutFavorites.length > 0){
//         console.log('Пользователи без избранного:');
//         usersWithoutFavorites.forEach(user => {
//             console.log(`${user.name}`);
//         });
// }

// const updatedUser = await updateUser(testUser1.id, { 
//     name: "Иван Обновленный",
//     email: "ivan.updated@gmail.com"
//     });
//     console.log('Пользователь обновлен!');

//     const updatedProduct = await updateProduct(testProduct1.id, { 
//         title: "Джинсы обновленные",
//         description: "Супер новые крутые джинсы"
//     });
//     console.log('Товар обновлен!');


//     await removeFromFavorites(testUser1.id, testProduct1.id);
//     console.log('Удалено из избранного!');

//     await removeFromCart(testUser1.id, testProduct1.id);
//     console.log('Удалено из корзины!');

//     // const deletedUser = await deleteUser(testUser2.id);
//     // console.log('Пользователь удален!', deletedUser.name);

//     // const deletedProduct = await deleteProduct(testProduct2.id);
//     // console.log('Товар удален!', deletedProduct.title);

//     await removeFromCart(testUser2.id, testProduct1.id);
//     await removeFromFavorites(testUser2.id, testProduct1.id); 
//     const deletedUser = await deleteUser(testUser2.id);
//     console.log('Пользователь удален!');

//     await db.delete(favorites).where(eq(favorites.productId, testProduct2.id));
//     await db.delete(cart).where(eq(cart.productId, testProduct2.id));
//     const deletedProduct = await deleteProduct(testProduct2.id);
//     console.log('Товар удален:', deletedProduct.title);


// }
// TestAll();