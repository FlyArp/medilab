// Carousel

$('.works').owlCarousel({
	items: 1,
	loop: true,
	dots: true,
	dotsEach:true,	
	margin: 10,
	responsive: {
		767: {
			items: 2,
			dotsEach: false
		},
		991: {
			dots:false,
			nav: true,
			navText: [
			'<div class="arrow-wrap"><div class="arrow arrow_left"></div></div>',
			'<div class="arrow-wrap"><div class="arrow arrow_right"></div></div>'],
			items: 3
		}
	}
});