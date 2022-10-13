let cartProducts = JSON.parse(localStorage.getItem("parsedGetCart"));
let cart = [];
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
                        cartProduct.price = product.price * cartProducts[i].quantity
                        cart.push(cartProduct)
                        displayImage(product, i)
                        displayProductContent(i)
                        displayDescription(product, i)
                        displaySettings(i)
                        displayQuantity(i)
                        displayDelete(i)
                        displayTotalProducts(i)
                        displayTotalPrice(product, i)
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

function displayDescription(product, i) {
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
    price.innerText = product.price + ",00" + "€"
    div.appendChild(price)
}

function displaySettings(i) {
    const div = document.createElement("div")
    div.classList = "cart__item__content__settings"
    document.querySelectorAll(".cart__item__content")[i].appendChild(div)
}

function displayQuantity(i) {
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
    input.addEventListener("change", () => updateQuantity(i, input.value))
}

function updateQuantity(i, newValue) {
    const oldValue = cartProducts[i].quantity
    cartProducts[i].quantity = Number(newValue)
    localStorage.setItem("parsedGetCart", JSON.stringify(cartProducts));
    const totalQuantity = document.querySelector("#totalQuantity")
    totalProducts += newValue - oldValue
    totalQuantity.innerText = totalProducts
}

function displayDelete(i) {
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
}

function displayTotalProducts(i) {
    const totalQuantity = document.querySelector("#totalQuantity")
    const itemQuantity = cartProducts[i].quantity
    totalProducts += itemQuantity
    totalQuantity.innerText = totalProducts
}

function displayTotalPrice(product, i) {
    const spanTotalPrice = document.querySelector("#totalPrice")
    const itemQuantity = cartProducts[i].quantity
    const itemPrice = product.price
    const itemTotalPrice = itemQuantity * itemPrice
    totalPrice += itemTotalPrice
    spanTotalPrice.innerText = totalPrice
}

function verifyAndValidateForm(cart) {
    let firstAndLastName = /[\wàéèâêäëçù-]{2,}/m
    let addressReg = /[\w\W\sàéèâêäëçù]{3,}/m
    let cityReg = /[\sa-zA-Zàéèâêäëçù-]{1,}/m
    let mailReg = /[\w\Wàéèâêäëçù]+@([\w\Wàéèâêäëçù]+\.)+[a-zA-Z]{2,}/m

    const firstName = document.querySelector("#firstName")
    firstName.addEventListener("input", () => {
        if (!firstAndLastName.test(firstName.value) || firstName.value === "") {
            const errorMessage = document.querySelector("#firstNameErrorMsg")
            errorMessage.innerText = "Veuillez saisir un prénom valide";
        } else {
            const nameAdded = document.querySelector("#firstNameErrorMsg")
            nameAdded.innerText = ""
        }
    });

    const lastName = document.querySelector("#lastName")
    lastName.addEventListener("input", () => {
        if (!firstAndLastName.test(lastName.value) || lastName.value === "") {
            const errorMessage = document.querySelector("#lastNameErrorMsg")
            errorMessage.innerText = "Veuillez saisir un nom valide";
        } else {
            const nameAdded = document.querySelector("#lastNameErrorMsg")
            nameAdded.innerText = ""
        }
    });

    const address = document.querySelector("#address")
    address.addEventListener("input", () => {
        if (!addressReg.test(address.value) || address.value === "") {
            const errorMessage = document.querySelector("#addressErrorMsg")
            errorMessage.innerText = "Veuillez saisir une adresse valide";
        } else {
            const addressAdded = document.querySelector("#addressErrorMsg")
            addressAdded.innerText = ""
        }
    });

    const city = document.querySelector("#city")
    city.addEventListener("input", () => {
        if (!cityReg.test(city.value) || city.value === "") {
            const errorMessage = document.querySelector("#cityErrorMsg")
            errorMessage.innerText = "Veuillez saisir une ville valide";
        } else {
            const cityAdded = document.querySelector("#cityErrorMsg")
            cityAdded.innerText = ""
        }
    });

    const mail = document.querySelector("#email")
    mail.addEventListener("input", () => {
        if (!mailReg.test(mail.value) || mail.value === "") {
            const errorMessage = document.querySelector("#emailErrorMsg")
            errorMessage.innerText = "Veuillez saisir une adresse email valide";
        } else {
            const addressAdded = document.querySelector("#cityErrorMsg")
            addressAdded.innerText = ""
        }
    });

    const submitOrder = document.querySelector("#order")
    submitOrder.addEventListener("click", (e) => {
        e.preventDefault();
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: mail.value
        }
        if (firstAndLastName.test(contact.firstName) === false ||
            firstAndLastName.test(contact.lastName) === false ||
            addressReg.test(contact.address) === false ||
            cityReg.test(contact.city) === false ||
            mailReg.test(contact.email) === false) {
            alert("Veuillez remplir tous les champs svp")
            return
        }
        if (cart = []) {
            alert("Votre panier est vide")
            return
        }
        let products = []
        for (i = 0; i < cart.length; i++) {
            products.push(cart[i].id)
        }
        const order = {
            contact,
            products,
        }
        prePostOrder(order)
    })
}

function prePostOrder(order) {
    const stringOrder = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        }
    }
    postOrder(stringOrder)
}

function postOrder(stringOrder) {
    fetch("http://localhost:3000/api/products/order", stringOrder)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("orderId", data.orderId),
                document.location.href = "confirmation.html?id=" + data.orderId
        })
}

getCartContent()
verifyAndValidateForm(cart)