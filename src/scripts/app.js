//© ExtraTNT
//Licenc GNU GPLv3.0
"use strict";
const SLIDE_PATH = '../Slides';
const NEXT_BTN = document.getElementById('nextBtn');
const PREV_BTN = document.getElementById('prevBtn');
const SLIDE_HOLDER = document.getElementById('slideHolder'); //used to edit the background
const NAV = document.getElementsByTagName('nav')[0];
const HTML = document.getElementsByTagName('html')[0];
let navVisible = true;
let allText = '';
let currentSlide = 0;

const nextSlide = () => {
  currentSlide++;
  loadSliede(currentSlide);
  HTML.focus(); //removes the focus from the button
};
const prevSlide = () => {
  currentSlide--;
  loadSliede(currentSlide);
  HTML.focus();
};
const calcHeighValue = () => navVisible? '97.5vh' : '100vh'

const slideExpander = (slidenr) => {
  try{
    let slide = document.getElementById('slide' + slidenr);
    slide.style.height = calcHeighValue();
  } catch (error) {
    console.log(error);
    alert("missing: slide"+slidenr + ": on slide " + slidenr + ", id was not defined!");
  }
}

const loadSliede = (slidenr) => {
  SLIDE_HOLDER.style.height = calcHeighValue();
  readTextFile(SLIDE_PATH + '/' + slidenr + '.html');
  SLIDE_HOLDER.innerHTML = allText;
  slideExpander(slidenr);
};

const readTextFile = (file) =>
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
      allText = '';
      if(rawFile.readyState === 4 &&
        (rawFile.status === 200 || rawFile.status == 0)){
          allText = rawFile.responseText;
      }
    }
    rawFile.send(null);
};
//init
if(!navVisible){
  NAV.style.display = "none";
}
loadSliede(currentSlide);

//add listener
NEXT_BTN.addEventListener('click', nextSlide);
PREV_BTN.addEventListener('click', prevSlide);
document.addEventListener('keyup', (e) => {
  if(e.code === "ArrowLeft"){
    prevSlide();
  } else if (e.code === "ArrowRight"){
    nextSlide();
  } else if(e.code === "Space"){
    if(navVisible){
      navVisible = false;
      NAV.style.display = "none";
    } else {
      navVisible = true;
      NAV.style.display = "block";
    }
    SLIDE_HOLDER.style.height = calcHeighValue();
    slideExpander(currentSlide);
  }
});
