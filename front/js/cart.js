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
                    }
                })
            })
        })
}

function displayProduct(cartProduct) {

    const article = document.createElement("article")

    article.classList = "cart__item"

    article.dataset.id = cartProduct.id

    article.dataset.color = cartProduct.color

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

getCartContent()