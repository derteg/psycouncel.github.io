$(function(){
	$('#mainPromoSlider').mainPromoSlider(); // слайдер на главной
	$('.js-select').formStyler(); // form customize
	$('#footer_gmap').footerGMap(); // footer google map
	$('.js-person_popup').personPopUp();
	$(window).on('load resize', function(){
		$('.js-height_adjustment').heightAdjustment();
	});
	$('.js-header_fix').menuFixed();
	$('.js-responsive_pic').imgFade() // плавные переод картинок
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

								overlayBG.click(function(){
									$dialog.dialog('destroy');
								})
								overlayBG.css({height: fullH, 'position': 'absolute'});
			          		},
			          		width: 900,
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
		         that.addClass('fix').find('.b-nav_item').eq(2).css({'position': 'absolute', 'opacity': 0});
		    } else {
		         that.removeClass('fix').find('.b-nav_item').eq(2).css({'position': 'relative', 'opacity': 1});
		    }
		});
	}
})(jQuery);

(function($){
	$.fn.imgFade = function(){
		$('.js-responsive_pic').hover(function(){
			$(this).find('.js-pic_hov').fadeIn();
		}, function(){
			$(this).find('.js-pic_hov').fadeOut();
		}, 200);
	}
})(jQuery)