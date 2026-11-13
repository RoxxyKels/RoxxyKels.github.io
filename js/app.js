
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
(function () {
    const $skills = $('#skills');
    if (!$skills.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const info = {
        'devicon-javascript-plain':    { name: 'JavaScript',  group: 'Development', note: 'Interactive functionality and DOM manipulation, including this section.' },
        'devicon-html5-plain':         { name: 'HTML',        group: 'Development', note: 'Semantic, accessible page structure.' },
        'devicon-css3-plain':          { name: 'CSS',         group: 'Development', note: 'Responsive layouts with CSS Grid and Flexbox.' },
        'devicon-java-plain-wordmark': { name: 'Java',        group: 'Development', note: 'Object-oriented programming.' },
        'devicon-swift-plain':         { name: 'Swift',       group: 'Development', note: 'Programming for Apple platforms.' },
        'devicon-figma-plain':         { name: 'Figma',       group: 'Design',      note: 'Wireframes, prototypes and UI/UX design, such as the Cloud Nine Spa app.' },
        'devicon-photoshop-plain':     { name: 'Photoshop',   group: 'Design',      note: 'Digital artwork and graphic design.' },
        'devicon-illustrator-plain':   { name: 'Illustrator', group: 'Design',      note: 'Vector graphics and brand identity work.' },
        'devicon-canva-original':      { name: 'Canva',       group: 'Design',      note: 'Social media graphics and marketing assets.' },
        'devicon-linux-plain':         { name: 'Linux',       group: 'Tools',       note: 'Command-line and development environments.' },
        'devicon-vscode-plain':        { name: 'VS Code',     group: 'Tools',       note: 'My everyday code editor.' },
        'devicon-github-original':     { name: 'GitHub',      group: 'Tools',       note: 'Version control: branches, issues, pull requests and code review.' }
    };

    const defaultText = 'Hover over, tap or focus an icon to see how I use it.';
    let activeKey = null;
    let filter = 'All';

    // Set up the icons
    $skills.children('i').each(function () {
        const $i = $(this);
        const key = Object.keys(info).find(function (k) { return $i.hasClass(k); });
        if (!key) return;
        $i.data({ key: key, group: info[key].group })
          .attr({ tabindex: 0, role: 'button', 'aria-label': info[key].name + ': ' + info[key].note })
          .css({
              cursor: 'pointer',
              opacity: 0,
              transform: reduceMotion ? 'none' : 'scale(0.6)',
              transition: reduceMotion ? 'none' : 'opacity .4s ease, transform .3s ease, filter .3s ease, color .3s ease'
          });
    });
    const $known = $skills.children('i').filter(function () { return $(this).data('key'); });

    // Category filter buttons and the description panel
    const $chips = $('<div>').attr({ role: 'group', 'aria-label': 'Filter skills by category' }).css({
        gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '20px'
    });
    const $panel = $('<p>').attr('aria-live', 'polite').css({
        gridColumn: '1 / -1', minHeight: '3.2em', margin: '30px 0 0', maxWidth: '700px', fontSize: '0.7em', color: '#e9d5ff'
    }).text(defaultText);

    ['All', 'Development', 'Design', 'Tools'].forEach(function (label) {
        $('<button type="button">').text(label)
            .attr('aria-pressed', String(label === 'All'))
            .css({ padding: '8px 18px', borderRadius: '30px', border: '2px solid #7c11a7', color: '#fff', cursor: 'pointer',
                   font: 'inherit', fontSize: '0.6em', background: label === 'All' ? '#7c11a7' : 'transparent' })
            .on('click', function () { setFilter(label); })
            .appendTo($chips);
    });

    const $h2 = $skills.children('h2').first();
    if ($h2.length) { $h2.after($chips); } else { $skills.prepend($chips); }
    $skills.append($panel);

    // One function decides how an icon looks (filter, hover and selected states)
    function paint($i, hovered) {
        const show = filter === 'All' || $i.data('group') === filter;
        const lifted = hovered || $i.data('key') === activeKey;
        $i.css({
            opacity: show ? 1 : 0.2,
            transform: reduceMotion ? 'none' : (lifted ? 'translateY(-8px) scale(1.15)' : (show ? 'scale(1)' : 'scale(0.85)')),
            filter: lifted ? 'drop-shadow(0 0 14px #c58bff)' : 'none',
            color: lifted ? '#e9d5ff' : '#fff'
        });
    }

    function showSkill(key) {
        $panel.empty()
            .append($('<strong>').text(info[key].name + ': '))
            .append(document.createTextNode(info[key].note));
    }

    function showDefault() {
        if (activeKey) { showSkill(activeKey); } else { $panel.text(defaultText); }
    }

    function setFilter(label) {
        filter = label;
        $chips.children().each(function () {
            const on = $(this).text() === label;
            $(this).attr('aria-pressed', String(on)).css('background', on ? '#7c11a7' : 'transparent');
        });
        $known.each(function () { paint($(this), false); });
    }

    $known
        .on('mouseenter focus', function () { paint($(this), true); showSkill($(this).data('key')); })
        .on('mouseleave blur', function () { paint($(this), false); showDefault(); })
        .on('click', function () {
            const key = $(this).data('key');
            activeKey = (activeKey === key) ? null : key;
            const $clicked = $(this);
            $known.each(function () { paint($(this), $(this).is($clicked)); });
            showDefault();
            if (activeKey === null) { showSkill(key); }
        })
        .on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $(this).trigger('click'); }
        });

    // Staggered entrance when the section scrolls into view
    function enter() {
        $known.each(function (i) {
            const $i = $(this);
            setTimeout(function () { paint($i, false); }, reduceMotion ? 0 : i * 70);
        });
    }
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) { enter(); io.disconnect(); }
        }, { threshold: 0.3 });
        io.observe($skills[0]);
    } else {
        enter();
    }
})();