$(function() {
// Подключаемые модули ===================================================================================================================================================================================================
	// @include('smoothScroll.js')
	// @include('owlCarousel.js')
	// @include('burger.js')
	// @include('aosAnimation.js')
	// @include('langDetect.js')
	// @include('scrollSpy.js')
	@@include('dynamicAdapt.js')

// Глобальные Переменные ===================================================================================================================================================================================================

	// var scrollOffset = $(window).scrollTop() + $(window).height(),

// Активный код ================================================================================================================================================================

	// $(window).on('scroll', function(event) {
	// 	scrollOffset = $(window).scrollTop() + $(window).height();	
	// });
	if(document.title === "Home") {
		$('.list-menu').addClass('lock');
	}

	$('.item-list__title').on('click', function(event) {
		$(this).find('.arrow').toggleClass('active');
		$(this).parent().find('.item-list__subitem-list').slideToggle(400);
	});
	$('.callback__burger').on('click', function(event) {
		$(this).toggleClass('active');
		$('.callback__content').slideToggle(400);
		if (!$(this).hasClass('active')) {
			setTimeout(() => {
			  $('.callback__content').removeAttr('style');
			}, 650);
		}
	});
	$('.menu-btn').on('click', function(event) {
		if(($(window).innerWidth()<=767) || !$('.list-menu').hasClass('lock')) {
			$('.list-menu').slideToggle(600);
			$('.menu-btn').find('.arrow').toggleClass('active');
			if (!$(this).find('.arrow').hasClass('active')) {
				setTimeout(() => {
				  $('.list-menu').removeAttr('style');
				}, 650);
			}
		}
	});

	// Popup ============================================================================================================================================
	// Появление
	$('.callback__button').on('click', function(event) {
		event.preventDefault();
		$('.popup-wrapper').fadeIn('400');
		$('.popup-callback').fadeIn('400');
		$('body').addClass('lock');
	});
	$('.about__button').on('click', function(event) {
		event.preventDefault();
		$('.popup-wrapper').fadeIn('400');
		$('.popup-callback').fadeIn('400');
		$('body').addClass('lock');
	});
	$('form').on('submit', function(event) {
		event.preventDefault();
		var formData = $(this).serialize();
		$.ajax({
			url: '#',
			type: 'GET',
			data: formData,
		})
		.done(function() {
			if (!($('.popup-wrapper').css('display') === 'block')) {
				$('.popup-wrapper').fadeIn('400');
			}
			if ($('.popup-callback').css('display') === 'block') {
				$('.popup-callback').fadeOut('400');
			}
			$('.popup-thank').fadeIn('400');
			$('body').addClass('lock');
		})
	});
	// Исчезновение
	$('.popup-close').on('click', function(event) {
		event.preventDefault();
		$('.popup-wrapper').fadeOut('400');
		$('.popup-callback').fadeOut('400');
		$('body').removeClass('lock');
	});

	$('.popup-wrapper').on('click', function(event) {
		if (!event.target.closest('.popup-callback') && !event.target.closest('.callback__button') && $('.popup-wrapper').css('display') === 'block') {
			$('.popup-wrapper').fadeOut('400');
			$('.popup-callback').fadeOut('400');
			$('.popup-thank').fadeOut('400');
			$('body').removeClass('lock');
		}
	});
// ============================================================================================================================================
	function arrowCheck (argument) {
		if($('.list-menu').css('display') === 'block') {
			$('.menu-btn').find('.arrow').addClass('active');
		} else {
			$('.menu-btn').find('.arrow').removeClass('active');
		}
	}

	function cardsCheck (argument) {
		if ($(window).innerWidth() > 758) {
			$('.cards__container').trigger('destroy.owl.carousel')
		} else {
			$('.cards__container').owlCarousel({
				items: 1,
				loop: true,
				dots: true,
				dotsEach: 2,
				dotsSpeed: 800,
				margin: 30,
				dragEndSpeed: 800,
				responsive: {
					480: {
						margin: 0
					}
				}
			});
		}
	}

	$('.reviews__container').owlCarousel({
				items: 1,
				loop: true,
				navSpeed: 800,
				dots: true,
				dotsEach: 2,
				nav: false,
				navText: [
				'<div class="carousel-arrow carousel-arrow_left"></div>',
				'<div class="carousel-arrow carousel-arrow_right"></div>'],
				dragEndSpeed: 800,
				responsive: {
					768: {
						dots: false,
						nav: true,
						items: 2
					},
					992: {
						dots: false,
						nav: true,
						items: 3
					}
				}
			});

	arrowCheck();
	cardsCheck();

	window.addEventListener('resize', () => {
		arrowCheck();
		cardsCheck();
	});
})