const queryString = window.location.search
const urlParams = new URLSearchParams (queryString)
const id = urlParams.get ("id")

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
