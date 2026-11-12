
let menuOpen = false;
const MAX_STUDENTS = 13;
let x = 0;
let y = 3;

function toggleMenu() {
    if (!menuOpen) {
      
        $('#mobileNav').animate({
            right: 0
        }, 300, 'swing');
    } else {
  
        $('#mobileNav').animate({
            right: -300
        }, 240, 'swing');
    }
    menuOpen = !menuOpen;
} // toggleMenu()
function closeMenu() {
    // Close the menu
    $('#mobileNav').animate({
        right: -300
    }, 240, 'swing');
    menuOpen = false;
} 

$(document).ready(function () {

    $('#mobileNav a').on('click', function () {
        closeMenu();
    });

    $(document).on('click', function (event) {
        if (
            !$(event.target).closest('#hamburger').length &&
            !$(event.target).closest('#mobileNav').length
        ) {
            if (menuOpen) {
                closeMenu();
            }
        }
    });

    $('#topBtn').hide();
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 400) {
            $('#topBtn').fadeIn(300);
        } else {
            $('#topBtn').fadeOut(300);
        }
    });

    const revealSections = document.querySelectorAll(
        '#about, #projects, #assignments, #skills, #contact'
    );
    revealSections.forEach(function (section) {
        section.classList.add('reveal');
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        revealSections.forEach(function (section) {
            observer.observe(section);
        });
    } else {
 
        revealSections.forEach(function (section) {
            section.classList.add('visible');
        });
    }

    $('a[href^="#"]').on('click', function (event) {
      const target = $(this).attr('href');
      if (target.length > 1 && $(target).length) {
      event.preventDefault();
      $('html, body').animate({
      scrollTop: $(target).offset().top
            }, 700);
        }
    });
}); 
