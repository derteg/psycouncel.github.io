$(function(){
	$('#mainPromoSlider').mainPromoSlider(); // слайдер на главной
	$('.js-select').formStyler(); // form customize
	$('#footer_gmap').footerGMap(); // footer google map
	$('.js-person_popup').personPopUp();
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
		            center: new google.maps.LatLng(55.7583379, 37.6266889),
		            zoom: 16,
		            zoomControl: false,
		            disableDoubleClickZoom: true,
		            mapTypeControl: false,
		            scaleControl: false,
		            scrollwheel: false,
		            panControl: false,
		            streetViewControl: false,
		            draggable : true,
		            overviewMapControl: false,
		            overviewMapControlOptions: {
		                opened: false,
		            },
		            mapTypeId: google.maps.MapTypeId.ROADMAP,
		            styles: [{    featureType: 'all',  stylers: [{saturation: -100},{gamma: 0.50}  ]}  ],
		        }
		        var mapElement = document.getElementById('footer_gmap');
		        var map = new google.maps.Map(mapElement, mapOptions);
		        var locations = [
		['Новая пл., 6', 'undefined', 'undefined', 'undefined', 'undefined', 55.7583379, 37.6266889, 'ico/marker.png']
		        ];
		        for (i = 0; i < locations.length; i++) {
					if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
					if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
					if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
		           if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
		           if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
		            marker = new google.maps.Marker({
		                icon: markericon,
		                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
		                map: map,
		                title: locations[i][0],
		                desc: description,
		                tel: telephone,
		                email: email,
		                web: web
		            });
		link = '';     }

		}
	}
})(jQuery);

(function($){
	$.fn.personPopUp = function(){
		var $cont = $(this);

		$cont.on('click', '.js-person_popup_lnk', function(e){
			e.preventDefault();
			var $btn = $(this),
				fullH = $('body').height();

				console.log(fullH)

			$.ajax({
		        url: $btn.attr('href'),
		        method: 'GET',
		        cache: false,
		        async: false,
		        success: function(html){
		        	var $dialog = $('<div/>').html(html);
		          $dialog.dialog({
		          		appendTo: 'body',
		          		position: {
		          			my: "center top", 
		          			at: "center top", 
		          			of: $cont 
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
		        }
		      });
		});
	}
})(jQuery)