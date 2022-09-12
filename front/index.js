//Création de toues les fiches canapé

for (let i = 0; i < products.length; i++) {
    const sectionFiches = document.querySelector ("#items");
    
    /*const linkElement = document.createElement ("a");

    linkElement.innerText = products[i].categorie;

    modeleElement.appendChild (linkElement);*/

    const modeleElement = document.createElement ("article");

    const imageElement = document.createElement ("img");

    imageElement.src = products[i].imageUrl;

    modeleElement.appendChild (imageElement);

    const altElement = document.createElement ("alt");

    altElement.innerText = products[i].altTxt;

    modeleElement.appendChild (altElement);

    const nameElement = document.createElement ("h3");

    nameElement.innerText = products[i].name;

    modeleElement.appendChild (nameElement);

    const descriptionElement = document.createElement ("p");

    descriptionElement.innerText = products[i].description;

    modeleElement.appendChild (descriptionElement);

    sectionFiches.appendChild(modeleElement);
}
