// On va récupérer l'id des produits
const queryString = window.location.search
const urlParams = new URLSearchParams (queryString)
const id = urlParams.get ("id")


// On ouvre la page products avec l'id correspondant à l'élément choisi via l'api
fetch (`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => showImage(res))

    
function showImage (sofa) {
    const sofaImg = document.querySelector(".item__img");

    const photo = document.createElement ("img");

    photo.src = sofa.imageUrl;

    photo.alt = sofa.altText;

    sofaImg.appendChild(photo);

    showName (sofa)
}

function showName (sofa) {

    const sofaName = document.querySelector("#title");

    sofaName.innerText = sofa.name;

    showPrice (sofa)
}

function showPrice (sofa) {

    const sofaPrice = document.querySelector("#price");

    sofaPrice.innerText = sofa.price;

    showDescription (sofa)
}

function showDescription (sofa) {

    const sofaDescription = document.querySelector("#description");

    sofaDescription.innerText = sofa.description;

    chooseColor (sofa)
}


// On récupère et on ajoute les différentes options de couleurs
function chooseColor (sofa) {
    for (let i=0; i < sofa.colors.length; i++){

        const sofaColor = document.querySelector("#colors");

        const color = document.createElement ("option");
        
        color.value = sofa.colors[i];

        color.text = sofa.colors[i];

        console.log(sofa.colors[i]);

        sofaColor.appendChild(color);
    }   
 }


// On ajoute un écouteur d'évenement pour selctionner la couleur et la quantité au clic
const button = document.querySelector ("#addToCart")

    button.addEventListener ("click", () => {
        const color = document.querySelector ("#colors").value
        const quantity = document.querySelector ("#quantity").value

         // on crée un objet
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
        }

        // On rattache la couleur à l'id
        const idAndColor = id + color

        // Si les champs sont vides on affiche une alerte, sinon on récupère le panier
        if (color === "" || quantity == 0) {
            alert ("Veuillez sélectionner une couleur et une quantité svp")
        }else{
            // Variable qui permet de récuperer les produits en fonctions de leur id ET de leur couleur
            let getCart = localStorage.getItem(idAndColor)
        
        // Si le panier est plein on récupère les donnés, sinon on le déclare "undefined" car il est vide  
        if (getCart != null) {
            parsedGetCart = JSON.parse(getCart)
        }else{
            parsedGetCart = undefined
        }

        // Si le panier est vide on ajoute le(s) produit(s), sinon on modifie la quantité du(es) produit(s) déjà ajouté(s)
        if (parsedGetCart == undefined) {
            localStorage.setItem (idAndColor, JSON.stringify(data))
        }else{
            parsedGetCart.quantity = parsedGetCart.quantity + data.quantity
            localStorage.setItem (idAndColor, JSON.stringify(parsedGetCart))
        }
    }})

