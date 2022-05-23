$(document).ready(function () {
	
	// Открытие подтверждения города
	$('.city-submit-window').fadeIn(500);

	//Подтверждение города закрытие
	$(document).on('click', '.submit-close', function () {
		$('.city-submit-window').fadeOut(200);
	});


	//Выбор раздела в верхней шапке
	$(document).on('mouseenter', '.menu_drop:not(.submenu-active)', function() {
		$('.menu_drop_container').stop().fadeOut(200);
		$('.menu_drop').removeClass('submenu-active');
		$(this).addClass('submenu-active')
		$(this).find('.menu_drop_container').stop().fadeIn(200);
	})
	.on('mouseleave', '.header_top-2', function() {
		$('.menu_drop').removeClass('submenu-active');
		$('.menu_drop_container').stop().fadeOut(200);
	});

	// Открытие заказать звонок
	$(document).on('click', '.button_callback', function() {
		$('.callback-popup-fade').fadeIn(200);
		$('.callback-popup-success-body').fadeOut(200);
		$('.callback-popup-body').fadeIn(200);
		
		$('body').addClass('popup-active');
	})

	// Настройка чекбокса
	$('.checkbox').click(function() {
		let checkbox = $(this).find('input');
		
		if (!checkbox.prop('checked')){
			checkbox.prop('checked', true);
		} else {
			checkbox.prop("checked", false);
		}
	});

	// Закрытие заказать звонок и его success
	$(document).on('click', '.popup-close', function() {
		$('.callback-popup-fade').fadeOut(200);
		$('body').removeClass('popup-active');
	})

	$(document).on('click', '.success-close-btn', function() {
		$('.callback-popup-fade').fadeOut(200);
		$('body').removeClass('popup-active');
	})

	// Отправка формы Заказать звонок
	// $(document).on('submit', '#callback-form', sendForm);
	$('#callback-form').submit(sendForm);

	// Валидация формы
	function formValidate () {

			let name = $(document).find('#form-name');
			let nameVal = name.val();

			let secName = $(document).find('#form-secname');
			let secNameVal = $(document).find('#form-secname').val();

			let confCheckboxStatus = $(document).find('#confed-checkbox').prop('checked');

			let errorCount = 0
			
			
			
			// Проверка имени на пустоту
			if (nameVal.length < 1) {
				name.addClass('field-error');
				errorCount++;
			} else {
				name.removeClass('field-error');
			};
			
			
			

			// Проверка фамилии на пустоту
			if (secNameVal.length < 1) {
				secName.addClass('field-error');
				errorCount++;
			} else {
				secName.removeClass('field-error');
			};

			// Проверка чекбокса
			if (!confCheckboxStatus) {
				$('#conf-checkbox-text').addClass('text-error');
				$('#confed-checkbox-label').addClass('checkbox-error');
				errorCount++;
			} else {
				$('#conf-checkbox-text').removeClass('text-error');
				$('#confed-checkbox-label').removeClass('checkbox-error');
			};

			return errorCount;
	} 

	// // Отправка формы заказать звонок
	function sendForm (e){
		e.preventDefault();
		let error = formValidate();
		let result = 0;
		console.log(error);
		// Проверка счетчика ошибок
		if (error == 0) {
			let response = $.ajax({
				method: "POST",
				url: "some",
				data: $('#callback-form').serialize()
			});
			
			result++;
			// $('.callback-popup-body').fadeOut(200);
			// $('.callback-popup-success-body').fadeIn(200);
			// document.getElementById('callback-form').reset();
		}

		if (result == 1) {
			$('.callback-popup-body').fadeOut(200);
			$('._success').fadeIn(200);
			document.getElementById('callback-form').reset();
		} else {
			$('._error').fadeIn(200);
		};
	};
	

	///Распознаем нажатие клавиши с английской буквой и переводим на русс.
	var mapKey = {
		'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', '[' : 'Х', ']' : 'Ъ', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', ';' : 'Ж', '\'' : 'Э', 'Z' : '?', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь', ',' : 'Б', '.' : 'Ю',
		};

	// Поле имя 
	$("#form-name").on('keyup', function () {
		var str = $("#form-name").val();
		var r = '';
		for (var i = 0; i < str.length; i++) {
		r += mapKey[str.charAt(i)] || str.charAt(i);
		};
		// $("#idinput").val(r).trigger('keydown');
		// Тригерр, если это поле ввода для другого плагина, например autocomplete
		$("#form-name").val(r);
		});
		///Распознаем нажатие клавиши с английской буквой и переводим на русс.

	// Поле фамилия 
	$("#form-secname").on('keyup', function () {
		var str = $("#form-secname").val();
		var r = '';
		for (var i = 0; i < str.length; i++) {
		r += mapKey[str.charAt(i)] || str.charAt(i);
		};

		$("#form-secname").val(r);
		});

		// Слайдер баннера
		let owl = $('.owl-carousel'); 
		owl.owlCarousel({
			loop: true,
			items: 1,
		});
		let fwdBanner = $('.banner-left').find('.arrow-fwd')
		let prevBanner = $('.banner-left').find('.arrow-prev')
		
		fwdBanner.click(function () {
			owl.trigger('next.owl.carousel');
		});
		prevBanner.click(function () {
			owl.trigger('prev.owl.carousel');
		});
	
		
		

});	




