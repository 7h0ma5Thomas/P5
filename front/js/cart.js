let cartProducts = JSON.parse(localStorage.getItem("parsedGetCart"));
console.log(cartProducts);

function getCartContent() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((products) => {
            cartProducts.forEach((cartProduct, i) => {
                displayProduct(cartProduct)
                products.forEach(product => {
                    if (product._id === cartProduct.id) {
                        displayImage(product, i)
                        displayProductContent(product, i)
                        displayDescription (product, i)
                        displaySettings (product, i)
                        displayQuantity (product, i)
                        displayDelete (product, i)
                    }
                })
            })
        })
}

function displayProduct(cartProduct) {

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

function displayProductContent(product, i) {

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

    color.innerText = product.colors[i]

    div.appendChild(color)

    const price = document.createElement("p")

    price.innerText = product.price +",00" + "€"

    div.appendChild(price)
}

function displaySettings (product, i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__settings"

    document.querySelectorAll(".cart__item__content")[i].appendChild(div)

}

function displayQuantity (product, i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__settings__quantity"

    document.querySelectorAll(".cart__item__content__settings")[i].appendChild(div)

    const quantity = document.createElement("p")

    quantity.innerText = "Qté : "

    div.appendChild(quantity)

    const input = document.createElement("input")

    input.classList = "itemQuantity"

    div.appendChild(input)  
}

function displayDelete (product, i) {

    const div = document.createElement("div")

    div.classList = "cart__item__content__settings__delete"

    document.querySelectorAll(".cart__item__content__settings")[i].appendChild(div)

    const deleteButton = document.createElement("button")

    deleteButton.classList = "deleteItem"

    div.appendChild(deleteButton)

    const text = document.createElement("p")

    text.innerText = "Supprimer"

    deleteButton.appendChild(text) 
}

getCartContent()

