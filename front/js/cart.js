// On récupère nos éléments contenu dans le localstorage
let cartProducts = JSON.parse(localStorage.getItem("parsedGetCart"));
// On déclare un tableau vide "cart"
let cart = [];
// On défini la quantité totals d'articles du panier à 0
let totalProducts = 0;
// On défini la veleur du prix total du panier à 0
let totalPrices = 0;

// On utilise cette fonction pour récupérer les informations de nos produits
// via l'API et les relier au DOM pour les afficher sur notre site
function getCartContent() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((products) => {
            // On boucle sur notre tableau de produits récupéré via le localstorage
            // puis on récupère chaque produit et leur index pour les relier au DOM
            // en appelant la fonction 
            cartProducts.forEach((cartProduct, i) => {
                displayProduct()
                // On boucle sur notre tableau pour récupérer les infos de nos produits
                // que l'on reliera au DOM en appelant nos fonctions
                products.forEach(product => {
                    // On ajoute au panier nos produits en fonction de leur id
                    // et on appelle nos fonctions
                    if (product._id === cartProduct.id) {
                        cartProduct.price = product.price * cartProducts[i].quantity
                        cart.push(cartProduct)
                        displayImage(product, i)
                        displayProductContent(i)
                        displayDescription(product, i)
                        displaySettings(i)
                        displayQuantity(i, product)
                        displayDelete(i, product)
                        displayTotalProducts(i)
                        displayTotalPrice(product, i)
                    }
                })
            })
        })
}

// On créé un article qui contient un produit et ses infos
// et on le relie au DOM
function displayProduct() {
    const article = document.createElement("article")
    article.classList = "cart__item"
    const cart__items = document.querySelector("#cart__items")
    cart__items.appendChild(article)
}

// On récupère via l'API l'image du/des produit(s) ajouté(s) au panier
// et on la relie au DOM pour l'afficher sur notre site
function displayImage(product, i) {
    const div = document.createElement("div")
    div.classList = "cart__item__img"
    document.querySelectorAll(".cart__item")[i].appendChild(div)
    const image = document.createElement("img")
    image.src = product.imageUrl
    div.appendChild(image)
}

// On créé un conteneur pour afficher les infos du/des produit(s)
// et on le relie au DOM
function displayProductContent(i) {
    const div = document.createElement("div")
    div.classList = "cart__item__content"
    document.querySelectorAll(".cart__item")[i].appendChild(div)
}

// On récupère via l'API le nom et le prix du/des produit(s),
// ainsi que leur couleur via le localstorage et on les relie
// au DOM pour les afficher sur notre site
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

// On créé un conteneur pour afficher les quantités modifiables
// et le bouton supprimer que l'on relie au DOM
function displaySettings(i) {
    const div = document.createElement("div")
    div.classList = "cart__item__content__settings"
    document.querySelectorAll(".cart__item__content")[i].appendChild(div)
}

// On créé un "input" pour afficher et rendre modifiable la quantité 
// de chaque produit, que l'on récupère via le localstorage, puis on
// au DOM pour l'afficher sur notre site
function displayQuantity(i, product) {
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
    // On utilise un écouteur d'évenement pour mettre à jour la quantité modifiée
    input.addEventListener("change", () => updateQuantity(i, input.value, product))
}

// On modifie la quantité totale d'article(s) dans le panier
// en fonction de la quantité modifiée via "l'input" pour un 
// ou plusieurs article(s), on modifie également prix total du panier,
//  puis on les relie au DOM
function updateQuantity(i, newQuantity, product) {
    const oldQuantity = cartProducts[i].quantity
    cartProducts[i].quantity = Number(newQuantity)
    localStorage.setItem("parsedGetCart", JSON.stringify(cartProducts));
    const totalQuantity = document.querySelector("#totalQuantity")
    totalProducts += newQuantity - oldQuantity
    totalQuantity.innerText = totalProducts

    const totalPrice = document.querySelector('#totalPrice')
    totalPrices += product.price * (newQuantity - oldQuantity)
    totalPrice.innerText = totalPrices
}

// On créé et on affiche le bouton "supprimer" en le reliant
// au DOM, puis on ajoute un écouteur d'évenement au click 
// pour supprimer le produit via une autre fonction
function displayDelete(i, product) {
    const div = document.createElement("div")
    div.classList = "cart__item__content__settings__delete"
    document.querySelectorAll(".cart__item__content__settings")[i].appendChild(div)
    const text = document.createElement("p")
    text.classList = "deleteItem"
    text.innerText = "Supprimer"
    div.appendChild(text)
    div.addEventListener("click", (e) => deleteProduct(e, i, product))
}

// Fonction appelée dans l'écouteur d'évenement   
// utilisée pour supprimer le produit du panier en le retirant du localstorage que l'on met à jour,
// ainsi qu'en le retirant du DOM
function deleteProduct(e, i, product) {
    // On récupère l'ancienne valeur de notre produit
    const oldQuantity = e.target.closest(".cart__item__content__settings").firstChild.lastChild.value

    // On met à jour la quantité total du panier
    const totalQuantity = document.querySelector("#totalQuantity")
    totalProducts -= oldQuantity
    totalQuantity.innerText = totalProducts

    // On met à jour le prix total du panier
    const totalPrice = document.querySelector("#totalPrice")
    totalPrices -= product.price * oldQuantity
    totalPrice.innerText = totalPrices

    // On vide le local storage et on le met à jour
    cartProducts.splice([i], 1)
    localStorage.setItem("parsedGetCart", JSON.stringify(cartProducts));
    // On récupère le parent dans le DOM 
    let cartItem = e.target.closest(".cart__item")
    // On supprime le produit du panier
    cartItem.remove()
    // On renvoie un tableau vide
    cart = []
}

// On affiche la quantité totale de produit(s) du panier 
// en additionnant la quantité de chaque produit
function displayTotalProducts(i) {
    const totalQuantity = document.querySelector("#totalQuantity")
    const itemQuantity = cartProducts[i].quantity
    totalProducts += itemQuantity
    totalQuantity.innerText = totalProducts
}

// On affiche le prix total pour chaque produit en multipliant leur quantité 
// par leur prix et en additionnant toutes les valeurs obtenues
function displayTotalPrice(product, i) {
    const spanTotalPrice = document.querySelector("#totalPrice")
    const itemQuantity = cartProducts[i].quantity
    const itemPrice = product.price
    const itemTotalPrice = itemQuantity * itemPrice
    totalPrices += itemTotalPrice
    spanTotalPrice.innerText = totalPrices
}

// On verifie que les champs du formulaire soient correctement
// remplis afin de valider et finaliser la commande  
function verifyAndValidateForm(cart, i) {
    // On déclare nos Regex (expressions régulières)
    let firstAndLastName = /[a-zA-Zàéèâêäëçù-]{2,}/m
    let addressReg = /[\w\W\sàéèâêäëçù]{3,}/m
    let cityReg = /[\sa-zA-Zàéèâêäëçù-]{1,}/m
    let mailReg = /[\w\Wàéèâêäëçù]+@([\w\Wàéèâêäëçù]+\.)+[a-zA-Z]{2,}/m

    // On vérifie que les champs de formulaire sont remplis convenablement 
    // en les comparant aux regex définies précédemment, si ceux-ci sont
    // incorrectes, on envoie un message d'erreur, sinon les champs sont valides
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
            const addressAdded = document.querySelector("#emailErrorMsg")
            addressAdded.innerText = ""
        }
    });

    // On utilise un écouteur d'évenement au click pour valider 
    // la commande après vérification du panier et du formulaire
    const submitOrder = document.querySelector("#order")
    submitOrder.addEventListener("click", (e) => {
        // On bloque l'acutalisation de la page
        e.preventDefault();
        // on créé un objet "contact"
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: mail.value
        }
        // Si les champs de formulaires sont vides, on envoie une alerte
        if (firstAndLastName.test(contact.firstName) === false ||
            firstAndLastName.test(contact.lastName) === false ||
            addressReg.test(contact.address) === false ||
            cityReg.test(contact.city) === false ||
            mailReg.test(contact.email) === false) {
            alert("Veuillez remplir tous les champs svp")
            return
        }
        // Si le panier est vide, on envoie une alerte
        if (cart.length <= 0) {
            alert("Votre panier est vide")
            return
        }
        // On créé un tableau contenant les produits du panier
        let products = []
        for (i = 0; i < cart.length; i++) {
            products.push(cart[i].id)
        }
        // On créé un objet global qui
        // contient l'objet "contact" 
        // et le tableaux "products"
        const order = {
            contact,
            products,
        }
        console.log(order);
        // On appelle la fonction
        PostOrder(order)
    })
}

// On envoie notre objet global
// sous forme de "chaîne" à l'API 
function PostOrder(order) {
    const stringOrder = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        }
    }
    // On appelle la fonction
    prePostOrder(stringOrder)
}

// On récupère l'id de notre commande, puis on effectue
// la re-direction vers la page de confirmation en fonction 
// de celui-ci
function prePostOrder(stringOrder) {
    fetch("http://localhost:3000/api/products/order", stringOrder)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("orderId", data.orderId),
                document.location.href = "confirmation.html?id=" + data.orderId
        })
}

// On appelle les fonctions
getCartContent()
verifyAndValidateForm(cart)