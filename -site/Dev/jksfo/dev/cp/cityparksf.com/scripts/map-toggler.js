;(function($) {
	isToggled = false;

	$(window).resize(function(){
		if ($("#mapselectors").css("width") != $("#map").css("width")){
			if($("#mapselectors").css("left") != null) {
				$('#mapselectors,#map').css('left', '');
				isToggled = false;
			}
		}
	});

    $(document).ready(function() {
        $('#maptoggler').click(function(){
			isToggled = !isToggled;
            if(isToggled){
                $('#mapselectors,#map').animate({
                    left: "100%",
                }, 500, function() {
                });
            }else{
                $('#mapselectors,#map').animate({
                    left: "0%",
                }, 500, function() {
                });
            }
        });
    })
})(jQuery);
