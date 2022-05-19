/* Base assignment - 10 images, autoplay feature, orientation status, progressively enhanced */

let slideShow = null;
let idleTimer = null;
const slideShowDelay = 4000;

document.addEventListener('DOMContentLoaded', preInit);

/* first select the initial album */
function preInit() {
    const initialAlbum = document.querySelector(".initial");
    initialAlbum.classList.add("selected");
    /* Listen for user click to change the album */
    document.querySelectorAll(".album-list a").forEach((btn) => {
        btn.addEventListener("click", changeAlbum);
    });
    /* remove the scroll bar from each alum when js is on */
    document.querySelectorAll(".album").forEach((album) => {
        album.style.overflowY = "hidden";
    });
    init();
}
/* With JS on, set up the selected album to display single images in a slide-show */
function init() {
    /*create shortcut vars */
    const back_btn = document.querySelector(".selected .back-btn");
    const next_btn = document.querySelector(".selected .next-btn");
    const frame = document.querySelector(".selected .frame");
    const slides = frame.querySelectorAll(".selected img");
    const caption = document.querySelector(".selected .caption");
    const controls = document.querySelector(".selected .controls");
    const albums = document.querySelectorAll(".album");

    /* hide the albums which are not selected */
    albums.forEach((album) => {
        if (!album.classList.contains("selected")) {
            album.classList.add("hide-album");
        }
    });

    /* collapse images; activate captions & controls */
    slides.forEach((slide) => {
        slide.classList.add("hide", "abs-pos");
    });
    caption.classList.add("status");
    controls.style.display = "block";

    // show the first slide and its orientation status
    slides[0].classList.remove("hide");
    caption.innerHTML = (frame.firstElementChild.alt) + (slides.length);
    console.log(caption.innerHTML);

    //detect when user clicks on next or back button 
    next_btn.addEventListener("click", changeSlide);
    back_btn.addEventListener("click", changeSlide);

    // setup autoplay on page load or on new album load until user clicks
    slideShow = setInterval(advanceSlide, slideShowDelay, 'next-btn');
}

/* handle a change in the album selected for show */
function changeAlbum(e) {

    e.preventDefault();

    /* create shortcut vars */
    const currentAlbum = document.querySelector(".selected");
    const albumId = e.target.getAttribute("data-album-id");
    const nextAlbum = document.getElementById(albumId);

    /* switch selected class from current album to the next album */
    currentAlbum.classList.remove("selected");
    nextAlbum.classList.add("selected");

    //stop the auto-play and reset the idle timer
    if (slideShow) {
        clearInterval(slideShow);
        slideShow = null;
    }
    if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
    }
    init();
}


/* advance the slide image in the direction requested */
function advanceSlide(direction) {

    /* create shortcut vars */
    const frame = document.querySelector(".selected .frame");
    console.log(frame);
    const slides = frame.querySelectorAll(".selected img");

    const caption = document.querySelector(".selected .caption");
    let showing = document.querySelector(".selected .current");
    let nextUp = "";

    if (direction === 'next-btn') {
        nextUp = showing.nextElementSibling;
    }

    if (direction === 'back-btn') {
        nextUp = showing.previousElementSibling;
    }

    // deactivate current image
    showing.classList.add("hide");
    showing.classList.remove("current");

    //make sure next image is there (going backwards)
    if (!nextUp) {
        nextUp = slides[slides.length - 1];
    }
    //make sure next image is there (going forwards)
    if (nextUp.nodeName !== "IMG") {
        nextUp = slides[0];
    }

    // activate next image
    nextUp.classList.remove("hide");
    nextUp.classList.add("current");
    //change caption text for orientation status
    caption.innerHTML = nextUp.alt + (slides.length);
    console.log(nextUp.alt + (slides.length));

}

/* function to handle the change of the slide image*/
function changeSlide(e) {

    // stop link from trying to reload page
    e.preventDefault();

    //stop the auto-play when user controls the album
    if (slideShow) {
        clearInterval(slideShow);
        slideShow = null;
    }

    //set a timer to restart the auto-play when idle time is detected
    if (idleTimer) {
        clearTimeout(idleTimer);
    }
    idleTimer = setTimeout(() => {
        slideShow = setInterval(advanceSlide, slideShowDelay, 'next-btn');
        idleTimer = null;
    }, 10000);

    //call the function to advance the slide
    advanceSlide(e.target.className);

}

/*bonus add nav dots allowing for direct access to any slide */