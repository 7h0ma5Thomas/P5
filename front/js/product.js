// On récupére l'id de nos produits
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

// On ouvre la page products en intégrant dans l'URL l'id correspondant 
// à l'élément choisi via l'api
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => showImage(res))

// On créé et on affiche l'image de l'élément
function showImage(sofa) {
    const sofaImg = document.querySelector(".item__img");
    const photo = document.createElement("img");
    photo.src = sofa.imageUrl;
    photo.alt = sofa.altText;
    sofaImg.appendChild(photo);
    showName(sofa)
}

// On créé et on affiche le nom de l'élément
function showName(sofa) {
    const sofaName = document.querySelector("#title");
    sofaName.innerText = sofa.name;
    showPrice(sofa)
}

// On créé et on affiche le prix de l'élément
function showPrice(sofa) {
    const sofaPrice = document.querySelector("#price");
    sofaPrice.innerText = sofa.price;
    showDescription(sofa)
}

// On créé et on affiche la description de l'élément
function showDescription(sofa) {
    const sofaDescription = document.querySelector("#description");
    sofaDescription.innerText = sofa.description;
    chooseColor(sofa)
}

// On récupère grace à une boucle les différentes options de couleurs
// que l'on affiche dans un menu déroulant
function chooseColor(sofa) {
    for (let i = 0; i < sofa.colors.length; i++) {
        const sofaColor = document.querySelector("#colors");
        const color = document.createElement("option");
        color.value = sofa.colors[i];
        color.text = sofa.colors[i];
        sofaColor.appendChild(color);
    }
}

// On déclare "bouton" que l'on rattache au DOM
const button = document.querySelector("#addToCart")

// On ajoute un produit au panier et on l'enregistre dans le localStorage
function addProduct(product, cart) {
    cart.push(product);
    localStorage.setItem("parsedGetCart", JSON.stringify(cart));
    return cart
}

// On ajoute un écouteur d'évenement pour selctionner la couleur 
// et la quantité au clic sur le bouton "ajouter au panier"
button.addEventListener("click", () => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    // On utilise une condition pour afficher une alerte 
    // en cas de champs non slélctionnés ou incorrects
    if (color === "" || quantity == 0 || quantity > 100 ) {
        alert("Veuillez sélectionner une couleur et une quantité valide svp")
    } else {
        // On récupère le contenu du panier si celui-ci est plein dans le localstorage, 
        // sinon on stocke un tableau vide dans la variable
        let cartProducts = localStorage.getItem("parsedGetCart") ? JSON.parse(localStorage.getItem("parsedGetCart")) : []

        // On crée un objet "product"
        const product = {
            id: id,
            color: color,
            quantity: Number(quantity),
        };

        // On déclare une variable pour un produit déja ajouté dans une couleur choisie
        // et on lui donne le booléen "false"
        let sameProductColor = false
        // On parcourt le tableau avec une boucle pour savoir si le produit est bien présent dans celui-ci
        cartProducts.forEach(cartProduct => {
            // si le produit est déjà présent dans la même couleur, on modifie seulement la quantité
            if (cartProduct.id == id && cartProduct.color == color) {
                sameProductColor = true
                cartProduct.quantity += parseInt(quantity)
                localStorage.setItem("parsedGetCart", JSON.stringify(cartProducts));
            }
        })
        // Si le produit n'est pas déjà présent, on l'ajoute au panier
        if (!sameProductColor) {
            cartProducts = addProduct(product, cartProducts)
        }

    }
})

