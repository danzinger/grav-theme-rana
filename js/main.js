//initialize metismenu
$("#metismenu").metisMenu();

var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 300,
    'tolerance': 70,
    'side': 'right'
});
document.querySelector('#toggle-button').addEventListener('click', function() {
    slideout.toggle();
});
//for closing menu on page click
function close(eve) {
    eve.preventDefault();
    slideout.close();
}
//make the hamburger animation correct when using touch events
slideout
    .on('beforeopen', function() {
        this.panel.classList.add('panel-open');
        $(".hamburger").toggleClass("is-active");
        $(".header-hamburger").toggleClass("fixed-open");
        $('.menu-border-container').addClass('border');
    })
    .on('open', function() {
        this.panel.addEventListener('click', close);
    })
    .on('beforeclose', function() {
        this.panel.classList.remove('panel-open');
        this.panel.removeEventListener('click', close);
        $('.menu-border-container').removeClass('border');
        $(".hamburger").removeClass("is-active");
        $(".header-hamburger").removeClass("fixed-open");
    });
// Uncomment to have the menu opend on page load. You may want to do this depending on the screen size...
// $(document).ready(function() {
//     slideout.toggle();
// });
// function checkOpen(eve) {
//     if (slideout.isOpen()) {
//         eve.preventDefault();
//         slideout.close();
//     }
// } 

// function addClick() {
//     document.querySelector('#panel').addEventListener('click', checkOpen);
// }

// function removeClick() {
//     document.querySelector('#panel').removeEventListener('click', checkOpen);
// }

// slideout.on('open', addClick);
// slideout.on('close', removeClick);
