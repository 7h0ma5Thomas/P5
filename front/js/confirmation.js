// On récupère l'id de la commande via le local storage
// on le relie au DOM pour l'afficher sur la page et on
// vide le local storage pour ne conserver aucune infos
function displayOrderNumber() {
    const orderId = document.querySelector("#orderId")
    orderId.innerText = localStorage.getItem("orderId")
    localStorage.clear()
}

// On appelle la fonction
displayOrderNumber()
