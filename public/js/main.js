/*global $,  document,  window, Swiper */

jQuery.noConflict();

(function ($) {

	//  ------------------------------------------ Scroll To Top Animate --------------------------------------
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	$('.scrollToTop').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
	/////////////////////////////////////////////////////////////////////
	// Calendar
	/////////////////////////////////////////////////////////////////////
	var hejriTodayNow = new Intl.DateTimeFormat('ar-TN-u-ca-islamicc', {
		// day: 'numeric',
		// weekday: 'long',
		month: 'long',
		year: 'numeric'
	}).format(Date.now(''));

	var hejriElement = "<div class='grey-color mt-2 dateHejriDay' style='width: 105px; margin: 5px auto'></div>"


	var today = new Date();

	//dates should be in this format inside the array "3-11-2019"
	var eventDays = ['3-' + today.getMonth() + '-' + today.getFullYear(), '11-' + today.getMonth() + '-' + today.getFullYear(), '27-' + today.getMonth() + '-' + today.getFullYear()];

	$.fn.datepicker.dates['en'] = {
		days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
		daysShort: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
		daysMin: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
		months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونية", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		titleFormat: "MM yyyy",
		/* Leverages same syntax as 'format' */
		weekStart: 6,
	};

	setTimeout(function () {
		$('.datepicker .datepicker-switch').append(hejriElement);
		$('.datepicker .dateHejriDay').text(hejriTodayNow);
	});
	$('.calendar-events').datepicker({
		todayHighlight: true,
		toggleActive: true,
		maxViewMode: 0,
		beforeShowDay: function (date) {
			var dateStr = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
			var beforeShowDayObj;
			if (eventDays.indexOf(dateStr) > -1) {
				beforeShowDayObj = {
					'classes': 'has-events',
					'content': '<span class="date-day">' + date.getDate() + '</span><div class="event-info"><div class="event-info-container"><h2><i class="icon-calendar"></i><span>' + date.getDate() + ' ' + $.fn.datepicker.dates['en'].months[date.getMonth()] + '</span></h2><div class="media"><img src="images/avater.png" alt="Generic placeholder image"><div class="media-body"><h5 class="mt-0 title">بندر احمد</h5><p class="sub-title">مدير شركة ABC للإسثتمار</p></div></div><div class="event-time"><i class="icon-clock-circular-outline"></i><span>12:00</span></div><p>عنوان طلب الاستشارة عنوان طلب الاستشارة</p></div></div>',
					'tooltip': 'Event Title'
				};
			} else {
				beforeShowDayObj = {
					//'enabled':false,
					'content': '<span class="date-day">' + date.getDate() + '</span>',
				};
			}
			return beforeShowDayObj;
		}
	}).on('changeDate', function (e) {
		//arabic SA intead TN
		var hejriToday = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
			month: 'long',
			year: 'numeric'
		}).format(e.date);
		var thisItem = e.delegateTarget;
		setTimeout(function () {
			$(thisItem).find('.datepicker-switch').append(hejriElement);
			$(thisItem).find('.dateHejriDay').text(hejriToday);
		});
	}).on('changeMonth', function (e) {
		var hejriToday = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
			month: 'long',
			year: 'numeric'
		}).format(e.date);
		var thisItem = e.delegateTarget;
		setTimeout(function () {
			$(thisItem).find('.datepicker-switch .dateHejriDay').remove();
			$(thisItem).find('.datepicker-switch').append(hejriElement);
			$(thisItem).find('.dateHejriDay').text(hejriToday);
		}, 50);
	});


	$('.calendar').datepicker({
		todayHighlight: true,
		toggleActive: true,
		maxViewMode: 0,
		beforeShowDay(date) {
			let beforeShowDayObj;
			beforeShowDayObj = {
				content: `<span class="date-day">${date.getDate()}</span>`
			};
			return beforeShowDayObj;
		},
	}).on('changeDate', function (e) {
		//arabic SA intead TN
		var hejriToday = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
			month: 'long',
			year: 'numeric'
		}).format(e.date);
		var thisItem = e.delegateTarget;
		setTimeout(function () {
			$(thisItem).find('.datepicker-switch').append(hejriElement);
			$(thisItem).find('.dateHejriDay').text(hejriToday);
		});
	}).on('changeMonth', function (e) {
		var hejriToday = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
			month: 'long',
			year: 'numeric'
		}).format(e.date);
		var thisItem = e.delegateTarget;

		setTimeout(function () {
			$(thisItem).find('.datepicker-switch .dateHejriDay').remove();
			$(thisItem).find('.datepicker-switch').append(hejriElement);
			$(thisItem).find('.dateHejriDay').text(hejriToday);
		}, 100);
	});
	hasHejriDate = false;

	$(".input-daterange").datepicker({
		maxViewMode: 0,
		autoclose: true,
		disableTouchKeyboard: true,
		keepEmptyValues: true,
		format: "mm/dd/yyyy",
		endDate: new Date(),
		todayHighlight: true,
		container: '.input-daterange',
		beforeShowDay(date) {
			let beforeShowDayObj;
			beforeShowDayObj = {
				content: `<span class="date-day">${date.getDate()}</span>`
			};
			return beforeShowDayObj;
		},
	}).on('changeDate', function (e) {
		//arabic SA intead TN
		var hejriToday = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
			month: 'long',
			year: 'numeric'
		}).format(e.date);
		setTimeout(function () {
			$(".datepicker-dropdown").find('.datepicker-switch').append(hejriElement);
			$('.datepicker-dropdown').find('.dateHejriDay').text(hejriToday);
		});
	}).on('changeMonth', function (e) {
		//arabic SA intead TN
		var hejriToday = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
			month: 'long',
			year: 'numeric'
		}).format(new Date(e.date));
		setTimeout(function () {
			$('.datepicker-dropdown').find('.datepicker-switch .dateHejriDay').remove();
			$('.datepicker-dropdown').find('.datepicker-switch').append(hejriElement);
			$('.datepicker-dropdown').find('.dateHejriDay').text(hejriToday);
		}, 50);
	})
	// .on('show', function (e) {
	// 	if (hasHejriDate == false) {
	// 		setTimeout(function () {
	// 			$('.datepicker .datepicker-switch').append(hejriElement);
	// 			$('.datepicker .dateHejriDay').text(hejriTodayNow);
	// 		});
	// 		hasHejriDate = true;
	// 	};
	// });


	/* Trigger on load or any where */
	// $('#event_date').trigger('changeDate');


	/////////////////////////////////////////////////////////////////////
	// Date-Picker
	/////////////////////////////////////////////////////////////////////


	//  ------------------------------------------ Modal Animate --------------------------------------

	// function testAnim(x) {
	// 	$('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');
	// };
	// $('.modal').on('show.bs.modal', function (e) {
	// 	testAnim('bounceInDown');
	// })
	// $('.modal').on('hide.bs.modal', function (e) {
	// 	testAnim('slideOutUp');
	// });

	//  ------------------------------------------  CountDown --------------------------------------

	ProgressCountdown(10, 'BeginCountdown', 'BeginCountdownText');

	function ProgressCountdown(timeleft, bar, text) {
		var countdownTimer = setInterval(function () {
			timeleft--;
			$('.' + bar).css("width", "100" - timeleft * 10 + '%');
			$('.' + text).text(timeleft);
			if (timeleft <= 0) {
				clearInterval(countdownTimer);
			}
		}, 1000);
	}





	//   ------------------------------------------ Map SVG Code  --------------------------------------
	$description = $(".description");
	$descriptionTitle = $(".description .title");
	$descriptionName = $(".description .name");
	$descriptionDetails = $(".description .allDetails");

	$('.enabled').hover(function (e) {
		$(this).attr("class", "enabled heyo");
		$description.addClass('active');
		$descriptionTitle.html($(this).attr('name'));
		$descriptionName.html($(this).attr('value'));
		$descriptionDetails.attr('href', $(this).attr('link'));
		$descriptionDetails.html('عرض كافة الفرص في <br>' + $(this).attr('link'));
		$description.css({
			left: e.pageX,
			top: e.pageY - 70
		});
	}, function () {
		$description.removeClass('active');
		$descriptionTitle.html('');
		$descriptionName.html('');
		$descriptionDetails.html('');
	});

	$(document).on('mousemove', function (e) {
		$description.css({
			left: e.pageX,
			top: e.pageY - 70
		});
	});


	//   ------------------------------------------ tooltip  --------------------------------------
	$('[data-toggle="tooltip"]').tooltip();



	//   ------------------------------------------ Show Password  --------------------------------------
	$(".input-password .show-password").mousedown(function () {
		$(this).prev().attr('type', 'text');
		$(this).addClass('active');
	}).mouseup(function () {
		$(this).prev().attr('type', 'password');
		$(this).removeClass('active');
	}).mouseout(function () {
		$(this).prev().attr('type', 'password');
		$(this).removeClass('active');
	});



	//   ------------------------------------------ File Upload Func  --------------------------------------
	$('.input-file-upload').on('change', function () {
		//get the file name
		var fileName = $(this).val();
		//replace the "Choose a file" label
		$(this).next('.custom-file-label').html(fileName);
	});


	//   ------------------------------------------  Select 2  init  --------------------------------------
	if ($('.select2').length) {
		var placeholder = "يرجى تحديد جنسيتك";
		$('.select2.dropdown').select2({
			dir: "rtl",
			placeholder: placeholder,
			searchInputPlaceholder: 'البحث',
		});
		$('.select2.multi').select2({
			dir: "rtl",
			minimumResultsForSearch: Infinity
		});
		$('.select2-search__field').attr('placeholder', 'يرجى تحديد هويتك');

	}



	// 
	//   ------------------------------------------  AutoComplete With  typeaheadjs  --------------------------------------

	if ($('.tagsinput').length) {
		var countries = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: {
				url: 'countries.json',
				filter: function (list) {
					return $.map(list, function (name) {
						return {
							name: name
						};
					});
				}
			}
		});
		countries.initialize();

		$('.tagsinput').tagsinput({
			typeaheadjs: {
				name: 'countries',
				displayKey: 'name',
				valueKey: 'name',
				source: countries.ttAdapter()
			}
		});
	}




	// 
	//   ------------------------------------------  Accordion  --------------------------------------
	$(".accordion").on("hide.bs.collapse show.bs.collapse", function (e) {
		$(e.target).parents(".item").toggleClass("active");
	});


	//   ------------------------------------------  scrollbar  --------------------------------------

	if ($('.scroll-bar').length || $('.scroll-bar-circle').length) {

		function scrollBarInt() {
			$.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
			$.mCustomScrollbar.defaults.axis = "yx"; //enable 2 axis scrollbars by default

			$(".scroll-bar").mCustomScrollbar();

			$(".scroll-bar-circle").mCustomScrollbar({
				theme: "rounded"
			});
		}
		scrollBarInt();
	}

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});

	//////////////////////////////////////////////
	// Add Bootstrap Rating Init Func
	//////////////////////////////////////////////
	if ($("input.rating").length) {
		$("input.rating").rating({
			min: 1,
			max: 5,
			"empty-value": 0,
			iconLib: "icon",
			activeIcon: "icon-star-1",
			inactiveIcon: "icon-star",
			clearable: false,
			clearableIcon: "glyphicon-remove",
			inline: false,
			readonly: false,
			copyClasses: true
		});
	}

	// TableSorted = true;

	// function sortTable(table, order) {
	// 	var asc = order === 'asc',
	// 		tbody = table.find('tbody');

	// 	tbody.find('tr').sort(function (a, b) {
	// 		if (asc) {
	// 			return new Date($('td:first', a).text()) > new Date($('td:first', b).text());

	// 		} else {
	// 			return $('td:first', b).text().localeCompare($('td:first', a).text());

	// 		}
	// 	}).appendTo(tbody);
	// }



	// $('.sort-asc-desc').on('click', function () {
	// 	$(this).toggleClass('asc');
	// 	if ($(this).hasClass('asc')) {
	// 		sortTable($(this).closest('.sortTable'), 'asc');
	// 	} else {
	// 		sortTable($(this).closest('.sortTable'), 'desc');
	// 	}

	// })

	//////////////////////////////////////////////
	// Add Slide right and left withh arrow Init Func
	//////////////////////////////////////////////
	// const buttonRight = document.getElementById('slideRight');
	// const buttonLeft = document.getElementById('slideLeft');

	// buttonRight.onclick = function () {
	// 	document.getElementById('scrollarea').scrollLeft += 100;
	// };
	// buttonLeft.onclick = function () {
	// 	document.getElementById('scrollarea').scrollLeft -= 100;
	// };
	if ($('.tags-carousel').length) {
		var swiper = new Swiper('.tags-carousel .swiper-container', {
			slidesPerView: 2,
			speed: 3000,
			spaceBetween: 20,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				576: {
					slidesPerView: 3,
					spaceBetween: 30
				},
				992: {
					slidesPerView: 5,
					spaceBetween: 30
				},
				1200: {
					slidesPerView: 6,
					spaceBetween: 30
				}
			}
		});
	}

	$('.date-sort').on('click', function () {
		$(this).toggleClass('active');
	});

	// 

	$('.search-form input').on('input keydown focus', function () {
		var itemInput = $(this);
		$(this).parents('.search-form').find('.clear-search').show();
		$(this).parents('.search-form').find('.clear-search').on('click', function (e) {
			e.preventDefault();
			itemInput.val('');
			$(this).hide();
		});
	});

	// 


	// // // // // // // // // // // //
	// Sidebar action
	// // // // // // // // // // // //
	//   $("body").on("click", e => {
	//     $(".business-sidebar").removeClass("open");
	//   });
	$(".sidebar-control").on("click", e => {
		e.stopPropagation();
		$(".business-sidebar").toggleClass("open");
		$(".wrapper").toggleClass("open");
	});

})(jQuery);