
let menuOpen = false;
const MAX_STUDENTS = 13;

function toggleMenu() {
  if(!menuOpen) {         // open the menu
    $('nav').animate({
      right: 0
    }, 300, 'swing');
  }
  else {                  // close the menu
    $('nav').animate({
      right: -300
    }, 240, 'swing');
  }
  menuOpen = !menuOpen;
} // toggleMenu()

function closeMenu() {
  $('nav').animate({
    right: -300
  }, 240, 'swing');
  menuOpen = false;
} // closeMenu()

let x = 0;
let y = 3;

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

function toggleMenu() {
const isOpen = mobileNav.style.right === "0px";

mobileNav.style.right = isOpen ? "-300px" : "0px";
  hamburger.classList.toggle("active", !isOpen);
}
function closeMenu() {
  mobileNav.style.right = "-300px";
hamburger.classList.remove("active");
    }