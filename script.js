$(".fa-heart").on('click', function(){
    let cpt = $(this).next().text();

    if (this.className == 'far fa-heart') { //like
        this.className = 'fas fa-heart';
        this.style.color = 'rgb(26, 188, 156)';
        $(this).next().text(++cpt);
    } else {    //dislike
        this.className = 'far fa-heart';
        this.style.color = "";
        $(this).next().text(--cpt);
    }
});



// Menu ---------------------------------------------------

"use strict";
window.addEventListener("DOMContentLoaded", (event) => {
  /* MENU */
  const lemenu = document.getElementById("lemenu");
  const cmdmenu = document.getElementById("cmdmenu");
  cmdmenu.addEventListener('click',function(){
    lemenu.style.display = (lemenu.style.display == 'none')? '':'none';
  });
  // au chargement de la page
  window.onload = function(){
    // on teste la largeur de la fenêtre
    var ww = window.innerWidth; // en pixels
    lemenu.style.display = ( ww > 991 )? '':'none';
    cmdmenu.style.display = ( ww > 991 )? 'none':'';
  };
  // au redimensionnement de la fenêtre
  window.onresize = function(){
    // on teste la largeur de la fenêtre
    var ww = window.innerWidth; // en pixels
    leMenu.style.display = ( ww > 991 )? '':'none';
    cmdmenu.style.display = ( ww > 991 )? 'none':'';
  };

});