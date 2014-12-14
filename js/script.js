$(function(){
	$('#mainPromoSlider').mainPromoSlider(); // слайдер на главной
});

(function($){
	$.fn.mainPromoSlider = function(){
		var slider = $(this);

		slider.slick({
			dots: false	
		})
	}
})(jQuery);