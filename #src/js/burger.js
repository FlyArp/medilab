// Burger menu

$('.header__burger').click(function() {
	$(this).toggleClass('active');
	$('.menu').toggleClass('active');
	// $('body').toggleClass('lock');
});