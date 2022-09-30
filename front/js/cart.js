let getCart = JSON.parse(localStorage.getItem("parsedGetCart"));
console.log(getCart);


function getDataFromApi (getItem, i) {
    console.log(i);
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((res) => displayImage(getItem, i, res))
} 

function getCartContent() {
    for (let i = 0; i < getCart.length; i++) {

        const getItem = getCart[i]

        displayArticle(getItem, i)

        getDataFromApi (getItem, i)
    }
}

function displayArticle(getItem) {

    const cart__item = document.createElement("article")

    cart__item.classList = "cart__item"

    cart__item.dataset.id = getItem.id

    cart__item.dataset.color = getItem.color

    const cart__items = document.querySelector("#cart__items")

    cart__items.appendChild(cart__item)
}

function displayImage(getItem, i, res) {
console.log("displayImage");
    const div__cart__item__img = document.createElement("div")

    div__cart__item__img.classList = "cart__item__img"

    document.querySelectorAll(".cart__item")[i].appendChild(div__cart__item__img)

    const image = document.createElement("img")

    image.src = res[i].imageUrl

    
    div__cart__item__img.appendChild(image)
}

getCartContent()



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

