const likeMe = document.getElementById("like");

var cpt = document.getElementById("number").innerHTML; // Initialisation du compteur
var node =  document.getElementById("number"); // On récupère notre noeud où sera rafraîchi la valeur du compteur
 


likeMe.addEventListener('click', function() {
    this.className = "fas fa-heart";
    if (this.style.color != "rgb(26, 188, 156)") {
        this.style.color = "rgb(26, 188, 156)";
        node.innerHTML = ++cpt;
    } else {
        this.style.color = "";
        this.className = "far fa-heart";
        node.innerHTML = --cpt;
    }

});
