// On va récupérer l'id des produits
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")


// On ouvre la page products avec l'id correspondant à l'élément choisi via l'api
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => showImage(res))


function showImage(sofa) {
    const sofaImg = document.querySelector(".item__img");

    const photo = document.createElement("img");

    photo.src = sofa.imageUrl;

    photo.alt = sofa.altText;

    sofaImg.appendChild(photo);

    showName(sofa)
}

function showName(sofa) {

    const sofaName = document.querySelector("#title");

    sofaName.innerText = sofa.name;

    showPrice(sofa)
}

function showPrice(sofa) {

    const sofaPrice = document.querySelector("#price");

    sofaPrice.innerText = sofa.price;

    showDescription(sofa)
}

function showDescription(sofa) {

    const sofaDescription = document.querySelector("#description");

    sofaDescription.innerText = sofa.description;

    chooseColor(sofa)
}


// On récupère et on ajoute les différentes options de couleurs
function chooseColor(sofa) {
    for (let i = 0; i < sofa.colors.length; i++) {

        const sofaColor = document.querySelector("#colors");

        const color = document.createElement("option");

        color.value = sofa.colors[i];

        color.text = sofa.colors[i];

        console.log(sofa.colors[i]);

        sofaColor.appendChild(color);
    }
}


// On ajoute un écouteur d'évenement pour selctionner la couleur et la quantité au clic
const button = document.querySelector("#addToCart")

// On utilise une fonction pour ajouter un produit au panier et l'enregistrer dans le localStorage
function addProduct(product, cart) {
    cart.push(product);
    localStorage.setItem("parsedGetCart", JSON.stringify(cart));
    return cart
}

button.addEventListener("click", () => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    // On utilise une condition pour afficher une alerte en cas de champs non slélctionnés
    if (color === "" || parseInt(quantity === 0)) {
        alert("Veuillez sélectionner une couleur et une quantité svp")
    } else {
        // On récupère le contenu du panier si celui-ci est plein, sinon on stocke un tableau vide dans la variable
        let cartProducts = localStorage.getItem("parsedGetCart") ? JSON.parse(localStorage.getItem("parsedGetCart")) : []

        // On crée un objet
        const product = {
            id: id,
            color: color,
            quantity: Number(quantity),
        };

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

