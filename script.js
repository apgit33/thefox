$(".fa-heart").on('click', function(event){
    // event.stopPropagation();
    // event.stopImmediatePropagation();
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


