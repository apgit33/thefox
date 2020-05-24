
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


// Barre de progression pendant la lecture de l'audio
//     ++++++++++++++++++++++++++++++++++++
//     !!! Pas réussi à faire une seule fonction !!!
//     ++++++++++++++++++++++++++++++++++++


var playerA = document.querySelector('#audioPlayerA');
var playerB = document.querySelector('#audioPlayerB');


playerA.addEventListener("timeupdate", updateProgress, false);
playerB.addEventListener("timeupdate", updateProgressB, false);

function updateProgress() {
    var progress = document.querySelector("#progressA");
    var value = 0;
    var status=document.querySelector('#statusA');
    if (playerA.currentTime > 0) {
       value = Math.floor((100 / playerA.duration) * playerA.currentTime);
    }
    
    if (playerA.ended) {
        status.className = 'fas fa-play status';
        value = 0;
        document.querySelector('#timeA').textContent ='0:00';
    }
    progress.style.width = value + "%"; 
}

function updateProgressB() {
    var progress = document.querySelector("#progressB");
    var value = 0;
    var status=document.querySelector('#statusB');
    if (playerB.currentTime > 0) {
       value = Math.floor((100 / playerB.duration) * playerB.currentTime);
    }
    
    if (playerB.ended) {
        status.className = 'fas fa-play status';
        value = 0;
        document.querySelector('#timeB').textContent ='0:00';
    }
    progress.style.width = value + "%"; 
}


// Gestion de la barre de volume
//     ++++++++++++++++++++++++++++++++++++
//     !!! Même types de problemes que la barre de progression !!!
//     ++++++++++++++++++++++++++++++++++++

var e = document.querySelector('#vlm-conA');
var eInner = document.querySelector('#vlm-sliderA');
var drag = false;
e.addEventListener('mousedown',function(ev){
   drag = true;
   updateBar(ev.clientX);
});
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

        if (playerA.muted) {
            playerA.muted = false;
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
        playerA.volume = percentage / 100;
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
var volume = e;
var volumeClass=document.querySelector('#vlmB');

        var percentage;
        //if only volume have specificed
        //then direct update volume
        if (playerB.muted) {
        playerB.muted = false;
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
        //update volume bar and video volume
        fInner.style.width = percentage +'%';
        playerB.volume = percentage / 100;
};