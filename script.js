// Gestion des likes sous les articles
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

// **************************************
// Début Gestion du/des lescteurs audio
// **************************************

function update(playerX) { 
    var time = playerX.currentTime; // Temps écoulé
    document.querySelector('#'+$('#'+playerX.id).siblings('.progressTime').attr('id')).textContent = formatTime(time);
}

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
	
    if (secs < 10) {
        secs = "0" + secs;
    }
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}


// Récupère l'id du lecteur
function lecteurId (x){
    return (document.querySelector('#' + x.siblings(':first').attr('id')));
}

// changement de l'icone + play/pause du lecteur au click
$(".status").on('click', function(){
    var player = lecteurId ($(this));
    
    if (this.className == 'fas fa-play status') {
        player.play();
        this.className = 'fas fa-pause status';
    } else {
        player.pause();	
        this.className = 'fas fa-play status';
    }
});

// changement de l'icone lecteur mute/demute au click 
$(".fa-volume-up").on('click', function(){
    var player = lecteurId ($(this));

    if (this.className == 'fas fa-volume-up vlm') {
        player.muted = true;
        this.className = 'fas fa-volume-mute vlm';
    } else {
        player.muted = false;
        this.className = 'fas fa-volume-up vlm';
    }
});

// ------
// Barre de progression pendant la lecture de l'audio
// ------


// on récup tous les lecteurs audio présents dans un array
const players = document.querySelectorAll('audio');

// pour chaque audio dans players, on ajoute un listener
for(var i=0, iMax = players.length; i < iMax; i++) {
   players[i].addEventListener("timeupdate", updateProgress, false);
}

function updateProgress() {

    var progress = document.querySelector('#'+$(this).siblings('.progressBar').children().attr('id'));
    var value = 0;
    var status=document.querySelector('#'+$(this).siblings('.status').attr('id'));
    
    if (this.currentTime > 0) {
       value = Math.floor((100 / this.duration) * this.currentTime);
    }
    
    if (this.ended) {
        status.className = 'fas fa-play status';
        value = 0;
        document.querySelector('#'+$(this).siblings('.progressTime').attr('id')).textContent ='0:00';
    }
    progress.style.width = value + "%"; 
}



// ------
// Gestion de la barre de volume
// ------
//     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     !!! Pas réussi à réunir en une fonction  !!!
//     !!! pour chaque barre de volume          !!!
//     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var e = document.querySelector('#vlm-conA');
var drag = false;
var eInner = document.querySelector('#vlm-sliderA');

e.addEventListener('mousedown',
    function(ev){
        drag = true;
        updateBar(ev.clientX);
    }
);
document.addEventListener('mousemove',function(ev){
   if(drag){
      updateBar(ev.clientX);
   }
});
document.addEventListener('mouseup',function(ev){
 drag = false;
});
var updateBar = function (x, vol) {
   var volume = e;
   var volumeClass=document.querySelector('#vlmA');
        var percentage;
        if (players[0].muted) {
            players[0].muted = false;
        }
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft;
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            volumeClass.className = 'fas fa-volume-mute vlm';
            percentage = 0;
        } else {
            volumeClass.className = 'fas fa-volume-up vlm';
        }

        eInner.style.width = percentage +'%';
        players[0].volume = percentage / 100;
};

var f = document.querySelector('#vlm-conB');
var fInner = document.querySelector('#vlm-sliderB');
var dragF = false;

f.addEventListener('mousedown',function(ev){
    dragF = true;
updateBarB(ev.clientX);
});
document.addEventListener('mousemove',function(ev){
if(dragF){
    updateBarB(ev.clientX);
}
});
document.addEventListener('mouseup',function(ev){
    dragF = false;
});
var updateBarB = function (x, vol) {
        var volume = f;
        var volumeClass=document.querySelector('#vlmB');

        var percentage;
        if (players[1].muted) {
            players[1].muted = false;
        }
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft;
            percentage = 100 * position / volume.clientWidth;
        }
        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            volumeClass.className = 'fas fa-volume-mute vlm';
            percentage = 0;
        } else {
            volumeClass.className = 'fas fa-volume-up vlm';
        }
        fInner.style.width = percentage +'%';
        players[1].volume = percentage / 100;
};

// **************************************
// Fin de la Gestion du/des lescteurs audio
// **************************************


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
    lemenu.style.display = ( ww > 1154 )? '':'none';
    cmdmenu.style.display = ( ww > 1154 )? 'none':'';
  };
  // au redimensionnement de la fenêtre
  window.onresize = function(){
    // on teste la largeur de la fenêtre
    var ww = window.innerWidth; // en pixels
    lemenu.style.display = ( ww > 1154 )? '':'none';
    cmdmenu.style.display = ( ww > 1154 )? 'none':'';
  };

});