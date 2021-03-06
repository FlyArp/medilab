$(function() {
// Подключаемые модули ===================================================================================================================================================================================================
	// @include('smoothScroll.js')
	// @include('owlCarousel.js')
	// @include('burger.js')
	// @include('aosAnimation.js')
	// @include('langDetect.js')
	// @include('scrollSpy.js')
	(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/


// Глобальные Переменные ===================================================================================================================================================================================================

	// var scrollOffset = $(window).scrollTop() + $(window).height(),

// Активный код ================================================================================================================================================================

	// $(window).on('scroll', function(event) {
	// 	scrollOffset = $(window).scrollTop() + $(window).height();	
	// });
	if($('form').is('.intro__form') && !$('.intro__form').hasClass('intro__form_l')) {
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
	$('.button_review').on('click', function(event) {
		event.preventDefault();
		$('.popup-wrapper').fadeIn('400');
		$('.popup-review').fadeIn('400');
		$('body').addClass('lock');
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
			$('.popup-review').fadeOut('400');
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

	$('.reviews__container.owl-carousel').owlCarousel({
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