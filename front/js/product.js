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

    //const sofaName = document.querySelector("#title");

    title.innerText = sofa.name;

    showPrice (sofa)
}

function showPrice (sofa) {

    //const sofaPrice = document.querySelector("#price");

    price.innerText = sofa.price;

    showDescription (sofa)
}

function showDescription (sofa) {

   //const sofaDescription = document.querySelector("#description");

    description.innerText = sofa.description;

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


// On ajoute un écouteur d'évenement au clic et on définit un message d'erreur 
const button = document.querySelector ("#addToCart")
if (button != null) {
    button.addEventListener ("click", (e) => {
        const color = document.querySelector ("#colors").value
        const quantity = document.querySelector ("#quantity").value
        if (color == null || color === "" || quantity == null || quantity == 0) {
            alert ("Veuillez sélectionner une couleur et une quantité svp")
        }

        // on crée un objet
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
            price: price
        }

        // on stock les données dans le localstorage et on crée une redirection
        localStorage.setItem (id, JSON.stringify(data))
        window.location.href = "cart.html"
    })
}