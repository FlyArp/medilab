// Smooth scroll

$('[data-scroll]').on('click', function(event) {
	event.preventDefault();
	var blockId = $(this).data('scroll'),
	blockOffset = $(blockId).offset().top;

	$('html, body').animate({
		scrollTop: blockOffset},
		700);

	// if ($('.burger').hasClass('burger_active')) {
	// 	$('.burger').removeClass('burger_active');
	// 	$('.nav').slideToggle(400);
	// }
});