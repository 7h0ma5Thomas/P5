getCart = JSON.parse(localStorage.getItem("parsedGetCart"));
console.log(getCart);

console.log(localStorage);





/*function displayCartContent(getCart){  
    for (let i = 0; i < getCart.length; i++) {

        const cart = document.querySelector ("#cart__items");

        const cartContent = document.createElement ("article");

        cartContent.classList = "cart__item";

        cart.appendChild (cartContent);
        
        const idItem = getCart[i].id + getCart[i].color;

        cartContent.appendChild(idItem);

        const cartItem = document.querySelector (".cart__item");

        const itemImg = document.createElement ("img");

        itemImg.classList = "cart__item__img";

        itemImg.src = getCart[i].imageUrl;

        itemImg.alt = "Photographie d'un canapé";

        cartItem.appendChild(itemImg);

    }
}*/

