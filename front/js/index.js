// On récupère les données concernant les canapés
fetch ("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((res) => displayProducts(res))

// On crée et on affiche les 8 fiches produits éléments par éléments    
function displayProducts(products){  
    for (let i = 0; i < products.length; i++) {

        const sectionFiches = document.querySelector ("#items");

        const linkElement = document.createElement ("a");

        const id = products._id

        linkElement.href = "./product.html?id=" + id
        
        sectionFiches.appendChild (linkElement);

        const modeleElement = document.createElement ("article");

        linkElement.appendChild (modeleElement);

        const imageElement = document.createElement ("img");

        imageElement.src = products[i].imageUrl;

        imageElement.alt = products[i].altTxt;

        modeleElement.appendChild (imageElement);

        const nameElement = document.createElement ("h3");

        nameElement.classList = "productName";

        nameElement.innerText = products[i].name;

        modeleElement.appendChild (nameElement);

        const descriptionElement = document.createElement ("p");

        descriptionElement.classList = "productDescription";

        descriptionElement.innerText = products[i].description;

        modeleElement.appendChild (descriptionElement); 
    }   
}




  
        

        
        