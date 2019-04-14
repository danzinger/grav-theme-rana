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
//make the hamburger animation correct when using touch events and add classes as needed
slideout
    .on('beforeopen', function() {
        this.panel.classList.add('panel-open');
        $(".hamburger").toggleClass("is-active");
        $(".header-hamburger").toggleClass("fixed-open");
        this.panel.classList.add('panel-translating');
    })
    .on('open', function() {
        this.panel.addEventListener('click', close);
    })
    .on('translatestart', function() {
        this.panel.classList.add('panel-translating');
    })
    .on('translateend', function() { 
        this.panel.classList.remove('panel-translating');
    })
    .on('beforeclose', function() {
        this.panel.removeEventListener('click', close);
        $(".hamburger").removeClass("is-active");
        $(".header-hamburger").removeClass("fixed-open");
    })
    .on('close', function() {
        this.panel.classList.remove('panel-open');
        this.panel.classList.remove('panel-translating');
    });
// Uncomment to have the menu opend on page load. For development...
// $(document).ready(function() {
//     slideout.toggle();
// });