/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
/*constant used to specify the active section range*/
const oneThirdScreenSize = screen.height/3;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/*function used to toggle the hamburger menu when clicked on mobile*/
function expand() {
    const list = document.getElementById('navbar__list');
    list.classList.toggle('expanded');
}

// Add class 'active' to section when near top of viewport
/*goes through sections, check the one in the viewport and mark it and the anchor as active*/
function checkActive() {
    const sections = document.getElementsByTagName('section');
    for (let section of sections) {
        const heading = section.firstElementChild;
        const rec = heading.getBoundingClientRect();
        if (rec.top + 150 > 0 && rec.top < oneThirdScreenSize) {
            section.classList.add('your-active-class');
            const anchor = document.getElementsByClassName('_'+section.getAttribute('id'))[0];
            anchor.classList.add('active');
        }else{
            section.classList.remove('your-active-class');
            const anchor = document.getElementsByClassName('_'+section.getAttribute('id'))[0];
            anchor.classList.remove('active');
        }
    }
}

// Scroll to anchor ID using scrollTO event
/*check the section that the anchor is linked to and scroll to it*/
function scrollToSection(event) {
    let id = event.target.getAttribute('href');
    if (id != null) {
        id = id.slice(1);   
    }
    const section = document.getElementById(id);
    if (section != null) {
        section.scrollIntoView({behavior: 'smooth'});
    }
    event.preventDefault();    
}

// Scroll to top
/*display the arrow if scrolled to the fold of the page*/
function showArrow() {
    const rec = document.body.getBoundingClientRect();
    const arrow = document.getElementById('topArrow');
    if (rec.top < 0) {
        arrow.classList.add('show');
    }
    else {
        arrow.classList.remove('show');
    }
}

/*scroll to top of the page if the arrow is clicked*/
function goTop() {
   window.scrollTo({top:0,behavior:'smooth'});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 
/*creating a fragment to store the list items before appending them*/
const fragment = document.createDocumentFragment();
/*
get all section elements and iterate through them.
create a list item, an anchor, append the anchor to the list item and finally append the list item to the fragment.
*/
const sections = document.getElementsByTagName('section');
for (let section of sections) {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#'+section.getAttribute('id'));
    anchor.innerHTML = section.getAttribute('data-nav');
    anchor.classList.add('menu__link');
    anchor.classList.add('_'+section.getAttribute('id'));
    listItem.appendChild(anchor);
    fragment.appendChild(listItem);
}
/*append the fragment to the unordered list*/ 
const list = document.getElementById('navbar__list');
list.appendChild(fragment);


// Scroll to section on link click
list.addEventListener('click', scrollToSection);


// Set sections as active
document.addEventListener('scroll', checkActive);


//Scroll to top
document.addEventListener('scroll', showArrow);
