const menuTrigger = document.getElementById('menuTrigger');
const body = document.body;
// La fiecare click pe butonul cu hamburger icon, adăugăm sau scoatem (deci facem toggle pe) clasa ActiveMenu în body, clasă care are niște CSS care afișează sau ascunde meniul mobil
menuTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    body.classList.toggle('ActiveMenu');
    return false;
});

const subnavTrigger = document.getElementById('subnavTrigger');
// La fiecare click pe butonul cu hamburger icon, adăugăm sau scoatem (deci facem toggle pe) clasa ActiveMenu în body, clasă care are niște CSS care afișează sau ascunde meniul mobil
subnavTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    body.classList.toggle('ActiveSubnav');
    return false;
});
// Închidere meniu Categorii (SubNav)
const closeSubnav = document.getElementById('closeSubnav');
closeSubnav.addEventListener('click', function (event) {
    event.preventDefault();
    body.classList.remove('ActiveSubnav');
    return false;
}
)

const filterOptions = document.getElementsByClassName('FilterOptions');
// @TODO MUST asigură-te că funcționalitatea asta se aplică doar la rezoluții peste 600px
// Parcurgem fiecare buton cu clasa FilterOptions și adăugăm pe el un eveniment de click
for (let i = 0; i < filterOptions.length; i++) {
    filterOptions[i].addEventListener('click', function (event) {
        // La fiecare click, vedem dacă există butoane care au deja proprietatea 'open'
        const alreadyOpen = document.querySelector('.FilterOptions[open]');
        // Dacă există astfel de butoane și ele sunt diferite de cel pe care am dat click acum, trebuie scos atributul 'open' de pe ele ca să nu se suprapună
        if (alreadyOpen != null && alreadyOpen != filterOptions[i])
            alreadyOpen.removeAttribute('open');
        return true;
    });
}

// console.log(window.innerWidth);
/* 
if (window.innerWidth > 600) {
    const resources = document.getElementsByClassName('ResourceMainTrigger');
    // Parcurgem fiecare buton din resurse și adăugăm pe el un eveniment de click
    for (let i = 0; i < resources.length; i++) {
        if (window.innerWidth > 750) {
            // dacă se depășește  750px lățime, atunci deschide toate detaliile și ignoră evenimentul de click
            resources[i].parentElement.setAttribute('open', 'open');
        } 
*/
        
            /* else {
            resources[i].addEventListener('click', function (event) {
                // La fiecare click, vedem dacă există butoane care au deja proprietatea 'open'
                const alreadyOpen = document.querySelector('.ResourceMain[open]');
                // Dacă există astfel de butoane și ele sunt diferite de cea pe al cărei buton am dat click acum, trebuie scos atributul 'open' de pe ele ca să nu se suprapună
                if (alreadyOpen != null && alreadyOpen != resources[i].parentElement)
                    alreadyOpen.removeAttribute('open');
                return true;
            });
        } */
/*
    }
}
*/

// definim media query-ul care delimitează rezoluția deasupra căreia vrem să afișăm detaliile fără collapse/expand
const mql = window.matchMedia("(min-width: 750px)");

showFullProducts(mql.matches);
// la fiecare modificare a window-ului..
mql.addEventListener("change", (event) => {
    // rulăm funcția care schimbă atributele de open când se schimbă valoarea de adevăr a match-ului de media query
    console.log(event.matches);
    showFullProducts(event.matches);
});
function showFullProducts(isDesktop) {
    const resources = document.getElementsByClassName('ResourceMain');
    // dacă booleanul e truthish
    if (isDesktop) {
        // păstrăm atributul open peste tot
        for (let i = 0; i < resources.length; i++) {
            resources[i].setAttribute('open', '');
        }
    } else {
        // altfel, îl scoatem
        for (let i = 0; i < resources.length; i++) {
            resources[i].removeAttribute('open');
        }
    }
}


let lastScrollTop = 0;
// EN: element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
// RO: elementul ar trebui înlocuit cu adevăratul element țintă sau cu window dacă nu există element țintă
window.addEventListener("scroll", function () { // or window.addEventListener("scroll" ..
    let st = window.scrollY || this.document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#426"
    if (st > lastScrollTop) {
        body.classList.add('ScrollDown');
    } else if (st < lastScrollTop) {
        // EN: upscroll code
        // RO: dacă se dă scrol. în sus
        body.classList.remove('ScrollDown');
    } else {
        // EN: else was horizontal scroll
        // RO: aici pare că a fost alt fel de scroll (orizontal)
        body.classList.remove('ScrollDown');
    }
    lastScrollTop = st <= 0 ? 0 : st; // EN: For mobile or negative scrolling
    // RO: pentru scolling mobil sau negativ
}, false);