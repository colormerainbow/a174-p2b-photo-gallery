/* Base assignment - 10 images, autoplay feature, orientation status, progressively enhanced */

document.addEventListener('DOMContentLoaded', init);

function init() {
  //create shortcut vars
  const back_btn = document.querySelector(".back-btn");
  const next_btn = document.querySelector(".next-btn");
  const frame = document.querySelector(".frame");
  const slides = frame.querySelectorAll("img");
  const caption = document.querySelector(".caption");
  const controls = document.querySelector(".controls");

  //with JS active, hide all images; activate captions & controls 
  slides.forEach((slide) => {
    slide.classList.add("hide", "abs-pos");
  });
  caption.classList.add("status");
  controls.style.display = "block";

  
  // show the first slide and orientation status
  slides[0].classList.remove("hide");
  caption.innerHTML = (frame.firstElementChild.alt) + (slides.length);
  console.log(caption.innerHTML);
  
   next_btn.addEventListener("click",changeSlide);
   back_btn.addEventListener("click", changeSlide);

}


/* call this function each time the user clicks on Next or Back */
function changeSlide(e) {
  
    // stop link from trying to reload page
    e.preventDefault();
    
    //shortcut vars
    const frame = document.querySelector(".frame");
    const slides = frame.querySelectorAll("img");
    const caption = document.querySelector(".caption");
    let showing = document.querySelector(".current");
    let nextUp = "";
  
    if(e.target.className == 'next-btn') {
      nextUp = showing.nextElementSibling;
    }
  
    if(e.target.className == 'back-btn') {
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



/* remove back/next buttons if js is disabled */

/*bonus additional albums up to 10 images with separate controls to select different albums, use same show/hide featuer */
/* leverage domloop exercise to create new albums that have carousel content */


/*bonus add nav dots allowing for direct access to any slide */


/*bonus consider making next and back buttons into arrows */