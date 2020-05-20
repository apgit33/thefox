
$(".fa-heart").on('click', function(){
    // initialisation d'un compteur avec la valeur du texte de la balise voisine
    let cpt = $(this).next().text();

    if (this.className == 'far fa-heart') { //
        this.className = 'fas fa-heart'; //on change d'icone
        this.style.color = 'rgb(26, 188, 156)'; //on lui applique la couleur
        $(this).next().text(++cpt); //on incrémente le nombre de like
    } else {    //dislike
        this.className = 'far fa-heart';
        this.style.color = "";
        $(this).next().text(--cpt);
    }
});


