let cartProducts = JSON.parse(localStorage.getItem("parsedGetCart"));
console.log(cartProducts);

let cart = [];
console.log(cart);

let totalProducts = 0;

let totalPrice = 0;

function getCartContent() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((products) => {
            cartProducts.forEach((cartProduct, i) => {
                displayProduct()
                products.forEach(product => {
                    if (product._id === cartProduct.id) {
                        cart.push (product)
                        displayImage(product, i)
                        displayProductContent(i)
                        displayDescription (product, i)
                        displaySettings (i)
                        displayQuantity (i)
                        displayDelete (i)
                        displayTotalProducts (i)
                        displayTotalPrice (product, i)
                    }
                })
            })
        })
}

function displayProduct() {

    const article = document.createElement("article")

    article.classList = "cart__item"

    const cart__items = document.querySelector("#cart__items")

    cart__items.appendChild(article)
}

function displayImage(product, i) {

    const div = document.createElement("div")

    div.classList = "cart__item__img"

    document.querySelectorAll(".cart__item")[i].appendChild(div)

    const image = document.createElement("img")

    image.src = product.imageUrl

    div.appendChild(image)
}

function displayProductContent(i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content"

    document.querySelectorAll(".cart__item")[i].appendChild(div)
}

function displayDescription (product, i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__description"

    document.querySelectorAll(".cart__item__content")[i].appendChild(div)

    const name = document.createElement("h2")

    name.innerText = product.name

    div.appendChild(name)

    const color = document.createElement("p")

    color.innerText = cartProducts[i].color

    div.appendChild(color)

    const price = document.createElement("p")

    price.innerText = product.price +",00" + "€"

    div.appendChild(price)
}

function displaySettings (i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__settings"

    document.querySelectorAll(".cart__item__content")[i].appendChild(div)

}

function displayQuantity (i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__settings__quantity"

    document.querySelectorAll(".cart__item__content__settings")[i].appendChild(div)

    const quantity = document.createElement("p")

    quantity.innerText = "Qté : "

    div.appendChild(quantity)

    const input = document.createElement("input")

    input.type = "number"

    input.classList = "itemQuantity"

    input.name = "itemQuantity"

    input.min = 1

    input.max = 100

    input.value = cartProducts[i].quantity

    div.appendChild(input) 

    input.addEventListener("change", () => updateQuantityAndPrice(i, input.value))
}

function updateQuantityAndPrice (i, newValue) {

    cartProducts[i].quantity = Number(newValue)

    localStorage.setItem("parsedGetCart", JSON.stringify(cartProducts));

    

    // rafraichir la page
}

function displayDelete (i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__settings__delete"

    document.querySelectorAll(".cart__item__content__settings")[i].appendChild(div)

    const text = document.createElement("p")
    
    text.classList = "deleteItem"

    text.innerText = "Supprimer"

    div.appendChild(text) 

    div.addEventListener("click", () => deleteProduct(i))
}

function deleteProduct(i) {

    cartProducts.splice(i)

    localStorage.setItem("parsedGetCart", JSON.stringify(cartProducts));

    let cartItems = document.getElementsByClassName("cart__item")

    cartItems[i].remove()
 
    console.log(cartItems); 
}

function displayTotalProducts (i) {

    const totalQuantity = document.querySelector("#totalQuantity")

    const itemQuantity = cartProducts[i].quantity

    totalProducts += itemQuantity //à modifier

    totalQuantity.innerText = totalProducts
}

function displayTotalPrice (product, i) {

    const spanTotalPrice = document.querySelector("#totalPrice")

    const itemQuantity = cartProducts[i].quantity

    const itemPrice = product.price

    const itemTotalPrice = itemQuantity * itemPrice

    totalPrice += itemTotalPrice //à modifier ?

    spanTotalPrice.innerText = totalPrice
}

function order() {

    const orderButton = document.querySelector("#order")

    orderButton.addEventListener("click", (e) => submitForm(e))

}

function submitForm(e) {

    e.preventDefault()

    if (cart.length === 0) alert("Veuillez ajouter un produit à votre panier svp")

    const form = document.querySelector(".cart__order__form")

    const body = makeRequestBody()

    fetch("http://localhost:3000/api/products/order", {

        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))

    //console.log(form.elements);

}

function makeRequestBody() {

    const body = {

        contact: {

            firstName: "firstName",
            lastName: "lastName",
            adress: "adress",
            city: "city",
            email: "email"
        },

        products: ["products"]
    }

    return body
}

getCartContent()

order()