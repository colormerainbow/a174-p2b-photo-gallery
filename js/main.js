/* Base assignment - 10 images, autoplay feature, orientation status, progressively enhanced */

let slideShow = null;
let idleTimer = null;
const catAlbum = document.querySelector("#cat-album");
const leavesAlbum = document.querySelector("#leaves-album");
const wildlifeAlbum = document.querySelector("#wildlife-album");
const albumBanner = document.querySelector(".album-banner");

document.addEventListener('DOMContentLoaded', init);
/*with js turned on, reveal the album selector */
albumBanner.classList.remove("hide");


function init() {
    //create shortcut vars
    const back_btn = document.querySelector(".selected .back-btn");
    const next_btn = document.querySelector(".selected .next-btn");
    const frame = document.querySelector(".selected .frame");
    const slides = frame.querySelectorAll(".selected img");
    const caption = document.querySelector(".selected .caption");
    const controls = document.querySelector(".selected .controls");

    //with JS active, collapse images; activate captions & controls 
    slides.forEach((slide) => {
        slide.classList.add("hide", "abs-pos");
    });
    caption.classList.add("status");
    controls.style.display = "block";

    // show the first slide and orientation status
    slides[0].classList.remove("hide");
    caption.innerHTML = (frame.firstElementChild.alt) + (slides.length);
    console.log(caption.innerHTML);

    next_btn.addEventListener("click", changeSlide);
    back_btn.addEventListener("click", changeSlide);

    // setup autoplay on page load until user clicks
    slideShow = setInterval(advanceSlide, 2000, 'next-btn');
}

function changeAlbum(e) {
    const selectedAlbum = document.querySelector(".selected");

    const albumId = e.target.getAttribute("data-album-id");

    selectedAlbum.classList.toggle("selected");
    const nextAlbum = document.getElementById(albumId);
    nextAlbum.classList.toggle("selected");

    //stop the auto-play to reset
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

catAlbum.addEventListener("click", changeAlbum);
leavesAlbum.addEventListener("click", changeAlbum);
wildlifeAlbum.addEventListener("click", changeAlbum);


//function for advancing slides
function advanceSlide(direction) {

    //shortcut vars
    const frame = document.querySelector(".selected .frame");
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
    showing.classList.toggle("hide");
    showing.classList.toggle("current");

    //make sure next image is there (going backwards)
    if (!nextUp) {
        nextUp = slides[slides.length - 1];
    }
    //make sure next image is there (going forwards)
    if (nextUp.nodeName !== "IMG") {
        nextUp = slides[0];
    }

    // activate next image
    nextUp.classList.toggle("hide");
    nextUp.classList.toggle("current");
    //change caption text for orientation status
    caption.innerHTML = nextUp.alt + (slides.length);
    console.log(nextUp.alt + (slides.length));

}

/* call this function each time the user clicks on Next or Back */
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
        slideShow = setInterval(advanceSlide, 2000, 'next-btn');
        idleTimer = null;
    }, 10000);

    //call the function to advance the slide
    advanceSlide(e.target.className);

}

/* leverage domloop exercise to create new albums that have carousel content */


/*bonus add nav dots allowing for direct access to any slide */


/*bonus consider making next and back buttons into arrows */