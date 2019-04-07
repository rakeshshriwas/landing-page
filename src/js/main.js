$('.navbar-toggler').on('click', function() {
    if( ! $('header>.navbar').hasClass('bg-white')) {
        $('header>.navbar').addClass('bg-white');
    }
});
/* Navbar Menu Reduce /--*/
$(window).trigger('scroll');
$(window).on('scroll', function () {
    var pixels = 50; 
    var top = 1200;
    
    if ($(window).scrollTop() > pixels) {
        $('header>.navbar').addClass('bg-white');
    } else {
        $('header>.navbar').removeClass('bg-white');
        $('#navbarNavDropdown').removeClass('show');
        $('.navbar-toggler').addClass('collapsed');
    }
});

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    navigation:false,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:false
        }
    }
})