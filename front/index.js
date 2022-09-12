// Récupération de la constante products du fichier Product.js
import { products } from "../back/models/Product";

//Création de toues les fiches canapé

for (let i = 0; i < products.length; i++) {
    const sectionFiches = document.querySelector ("#items");

    const modeleElement = document.createElement ("article");

    /*const linkElement = document.createElement ("a");

    linkElement.innerText = products[i].categorie;

    modeleElement.appendChild (linkElement);*/

    const imageElement = document.createElement ("img");

    imageElement.src = products[i].imageUrl;

    modeleElement.appendChild (imageElement);

    const nameElement = document.createElement ("h3");

    nameElement.innerText = products[i].name;

    modeleElement.appendChild (nameElement);

    const descriptionElement = document.createElement ("p");

    descriptionElement.innerText = products[i].description;

    modeleElement.appendChild (descriptionElement);

    sectionFiches.appendChild(modeleElement);
}
