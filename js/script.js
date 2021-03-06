$(function(){
	$('#mainPromoSlider').mainPromoSlider(); // слайдер на главной
	$('.js-select').formStyler(); // form customize
	$('#footer_gmap').footerGMap(); // footer google map
	$('.js-person_popup').personPopUp();
	$(window).on('load resize', function(){
		$('.js-height_adjustment').heightAdjustment();
	});
	$('.js-header_fix').menuFixed();
	$('.js-responsive_pic').imgFade() // плавные переход картинок
	$('.js-more_articles').ajaxArticles();
	$('.js-mainpromo_next').animateToPerson();
	$('.js-footer_pic').footerGalleryPopUp();
	$('.js-callback_top').callbackScroll();
	$('.js-contact_top').contactScroll();
	$('.js-quotation_wrap').blockquoteAnimate();
	$('.js-labs_slider').labsSlider();
});

(function($){
	$.fn.mainPromoSlider = function(){
		var slider = $(this);

		slider.slick({
			dots: false	
		})
	}
})(jQuery);

(function($){
	$.fn.formStyler = function(){
		var select = $(this);

		select.selectmenu();
	}
})(jQuery);

(function($){
	$.fn.footerGMap = function(){
		google.maps.event.addDomListener(window, 'load', init);
		    var map;
		    function init() {
		        var mapOptions = {
		        	zoom: 16,
		            center: new google.maps.LatLng(55.7583379, 37.6266889),
		            zoomControl: true,
	                zoomControlOptions: {
	                  style: google.maps.ZoomControlStyle.SMALL
	                },
                    scrollwheel: false,
      				disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
		            styles: [{    featureType: 'all',  stylers: [{saturation: -100},{gamma: 0.50}  ]}  ],
		        }
		        var mapElement = document.getElementById('footer_gmap');
		        var map = new google.maps.Map(mapElement, mapOptions);
		        var markericon = 'ico/marker.png';
		       	
		       	marker = new google.maps.Marker({
		       	    icon: markericon,
		       	    position: new google.maps.LatLng(55.7583379, 37.6266889),
		       	    map: map,
		       	    title: 'Новая пл., д.6'
		       	});

			}
	}
})(jQuery);

(function($){
	$.fn.personPopUp = function(){
		var $cont = $(this);

		$cont.on('click', '.js-person_popup_lnk', function(e){
			e.preventDefault();
			var $btn = $(this);

			$.ajax({
		        url: $btn.attr('href'),
		        method: 'GET',
		        cache: false,
		        async: false,
		        success: function(html){
		        	var $dialog = $('<div/>').html(html),
		        		dialH = $dialog.height(),
		        		fullH = $(document).height();
			          $dialog.dialog({
			          		appendTo: 'body',
			          		position: {
			          			my: "center top", 
			          			at: "center top", 
			          			of: window
			          		},
			          		open: function(){
			          			var overlayBG = $('.ui-widget-overlay');
			          			var $close = $('.ui-dialog-titlebar-close');

								overlayBG.click(dialogDestroy);
								$close.click(dialogDestroy);

								function dialogDestroy(){
									$dialog.dialog('destroy');
								}

								overlayBG.css({height: fullH, 'position': 'absolute'});

								if($btn.hasClass('l-about_person_btn')){
									var $form = $dialog.find('.b-popup_form_wrap'),
										$fOffset = $form.offset().top
									
									$('body, html').animate({
										scrollTop: $fOffset
									});
								}

								if($('.js-select')){
									$('.js-select').formStyler();
								}
			          		},
			          		width: 900,
			          		height: "auto",
							modal: true,
							dialogClass: "b-person_popup"
			          	});
			          $dialog.css({'position': 'absolute'});
			        }

		      });
		});
	}
})(jQuery);

(function($){
	$.fn.heightAdjustment = function(){
		var maxheight = 0;
		var that = $(this);
		that.each(function() {
		  if($(this).height() > maxheight) { maxheight = $(this).height(); }
		});

		that.height(maxheight);
	}
})(jQuery);

(function($){
	$.fn.menuFixed = function(){
		var that = $(this);

		$(window).on('scroll', function() {
		    if ($(this).scrollTop() > 30) {
		    	that.addClass('fix')
		         // that.addClass('fix').find('.b-nav_item').eq(2).addClass('l-fix_item')
		    } else {
		    	that.removeClass('fix')
		         // that.removeClass('fix').find('.b-nav_item').eq(2).removeClass('l-fix_item')
		    }
		});
	}
})(jQuery);

(function($){
	$.fn.imgFade = function(){
		$('.js-responsive_pic').hover(function(){
			$(this).find('.js-pic_hov').finish().fadeIn();
		}, function(){
			$(this).find('.js-pic_hov').finish().fadeOut();
		}, 600);
	}
})(jQuery);

(function($){
	$.fn.ajaxArticles = function(){
		var $btn = $(this);
		$btn.on('click', function(event){
			event.preventDefault();
			
			$.ajax({
		        url: $btn.attr('data-article-href'),
		        method: 'GET',
		        cache: false,
		        async: false,
		        success: function(html){
		        	$(html).appendTo('.js-articles')
		        	$('body').animate({
		        	  scrollTop: $('.b-articles_col:last').offset().top - $('.js-header_fix').height() - $('.b-articles_col').height() - 70
		        	}, 500)
			    }
		      });
		})
	}
})(jQuery);

(function($){
	$.fn.animateToPerson = function(){
		var win = $(window),
			$btn = this,
			$btnLnk = $('.js-person_scroll'),			
			$head = $('.js-header_fix');

		win.scroll(function(){
			if(win.scrollTop() >= 100){
				$btn.addClass('current');
			} else if (win.scrollTop() <= 100){
				$btn.removeClass('current');
			}
		});

		$btn.on('click', bodyAnimate);
		$btnLnk.on('click', bodyAnimate);

		function bodyAnimate(e){
			e.preventDefault();
			var $offset = $('.js-person_popup_lnk').offset().top;
			if($head.hasClass('fix')){
				var fixH = $head.height();
				$('body, html').animate({
					scrollTop: $offset - fixH
				});
			} else {
				var defH = $head.height();
				$('body, html').animate({
					scrollTop: $offset - defH - 92
				});
			}
		}
	}
})(jQuery);

(function($){
	$.fn.footerGalleryPopUp = function(){
		var elem = $(this);

		$.each(elem, function(index){			
			$(this).on('click', function(){
				var indexEl = index;
				var $btn = $(this);

					$.ajax({
				        url: $btn.attr('data-url'),
				        method: 'GET',
				        success: function(html){
				        	var $dialog = $('<div/>').html(html),
				        		dialH = $dialog.height(),
				        		fullH = $(document).height(),
				        		gallery = $('.js-footer_gallery');

					          $dialog.dialog({
					          		appendTo: 'body',
					          		position: {
					          			my: "center top", 
					          			at: "center top",
					          			of: window
					          		},
					          		open: function(event, ui){
					          			var overlayBG = $('.ui-widget-overlay');
					          			var $close = $('.ui-dialog-titlebar-close');
					          			var $gallery = $('.js-footer_gallery');

										overlayBG.click(dialogDestroy);
										$close.click(dialogDestroy);

										function dialogDestroy(){
											$dialog.dialog('destroy');
										}

										$gallery.slick({
											slidesToShow: 1,
    										slidesToScroll: 1,
											dots: false,
											infinite: false,
											onBeforeChange: function(){
												$('.slick-slide', $gallery).removeClass('slick-slide-next slick-slide-prev');
											},
											onAfterChange: function(){
												$('.slick-active', $gallery).next().addClass('slick-slide-next');
												$('.slick-active', $gallery).prev().addClass('slick-slide-prev');

												var nextPic = $('.slick-slide-next', $gallery).find('img').clone();
												var prevPic = $('.slick-slide-prev', $gallery).find('img').clone();

												$('.slick-prev img, .slick-next img', $gallery).remove();
												$('.slick-prev', $gallery).append(prevPic);
												$('.slick-next', $gallery).append(nextPic);
											}
										}).slickGoTo(parseFloat(indexEl));

										overlayBG.css({height: fullH, 'position': 'absolute'});
					          		},
					          		width: 1100,
									modal: true,
									dialogClass: "b-footer_gallery_popup"
					          	});
					          $dialog.css({'position': 'absolute'});
					        }

				      });
			})
		})
	}
})(jQuery);

(function($){
	$.fn.callbackScroll = function(){
		var $btn = this,
			$head = $('.js-header_fix');

		$btn.on('click', bodyAnimate)

		function bodyAnimate(e){
			e.preventDefault();
			if($head.hasClass('fix')){
				var fixH = $head.height();
				$('body,html').animate({
					scrollTop: $('#footer').offset().top - fixH
				});
			} else {
				var defH = $head.height();
				$('body,html').animate({
					scrollTop: $('#footer').offset().top - defH - 92
				});
			}
		}
	}
})(jQuery);

(function($){
	$.fn.contactScroll = function(){
		var $btn = this,
			$head = $('.js-header_fix');

		$btn.on('click', bodyAnimate)

		function bodyAnimate(e){
			e.preventDefault();
			if($head.hasClass('fix')){
				var fixH = $head.height();
				$('body,html').animate({
					scrollTop: $('.b-footer_adress').offset().top - fixH
				});
			} else {
				var defH = $head.height();
				$('body,html').animate({
					scrollTop: $('.b-footer_adress').offset().top - defH - 92
				});
			}
		}
	}
})(jQuery);

(function($){
	$.fn.blockquoteAnimate = function(){
		var $wrap = this;

		function onSlideInit(){
			var slideActive = $('.slick-active', $wrap),
				cont = $('.js-quotation', slideActive),
				textArr = cont.text().split(' ');
				newArray = [];

				for( var i=0; i<textArr.length; i++ ){
					var result = "<span class='l-quote'>"+ textArr[i] +" </span>";
					newArray.push(result);
				}
				
					cont.html(newArray);

			var timer = null;

			var	timer = setTimeout(function run(){
				var quote = $('.slick-active .l-quote', $wrap),
					quoteTitle = $('.js-quotation_title', slideActive);

				quote.first().addClass('active');
				cont.find('.l-quote.active').next().addClass('active');

				setTimeout(run, 150);

				if(quote.last().hasClass('active')){
					quoteTitle.addClass('active');
					clearTimeout(timer);
				}
			}, 150);
		}

		$wrap.slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 8000,
			swipe: false,
			onInit: function(){
				onSlideInit();
			},
			onBeforeChange: function(){
				$('.slick-active .l-quote', $wrap).removeClass('active');
				$('.js-quotation_title').removeClass('active');
			},
			onAfterChange: function(){
				onSlideInit();
			},
			adaptiveHeight: true
		});

	}
})(jQuery);


(function($){
	$.fn.labsSlider = function(){
		var $slider = this;

		$slider.slick();
	}
})(jQuery);