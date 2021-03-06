var filterizr;

$( document ).ready(function() {
	
	/*** Prism JS initials ***/
	Prism.plugins.NormalizeWhitespace.setDefaults({
		'remove-trailing': true,
		'remove-indent': true,
		'left-trim': true,
		'right-trim': true,
	});

	/*** Filterizr JS initials ***/
	filterizr = $(".filtr-container").filterizr({
		animationDuration: 0.2,
		layout: 'vertical'
	});

	/*** Sync option to filter val ***/
	$('.filtr-select').on('change', function(event) {
	   var val = $(event.currentTarget).val()
	   filterizr.filterizr('filter', val);
	});


	/*** Fixed Nav ***/
	var nav_height = $("nav").height();
	if ( $(window).scrollTop() >= nav_height ) {
		$("nav").addClass("fixed");
	} else {
		$("nav").removeClass("fixed");
	}
	$(window).scroll(function(){
		if ( $(window).scrollTop() >= nav_height ) {
			$("nav").addClass("fixed");
			$("body").css("padding-top", nav_height + "px");
		} else {
			$("nav").removeClass("fixed");
			$("body").css("padding-top", "0px");
		}
	});
	
	
	/*** Sample Code Toggle ***/
	$(".filtr-container .filtr-item .title").click(function() {
		$(this).parent().toggleClass("active");
		$(window).resize();
		resetFilter();
	});
	
	
	/*** Sample Code Title Tag ***/
	$(".filtr-container").ready(function() {
		$(".filtr-container .filtr-item").each(function() {
			var catName = $(this).attr("data-category");
			$(".title", this).prepend("<span class='tag'>" + catName + "</span>");
		});
	});

});


/****** On Resize ******/
window.onresize = function(event) {
    resetFilter();
};


/*** Reset and Sync Select Option ***/
function resetFilter() {
	var intervalID = setInterval( function() {
		var val = $(".filtr-select option:selected").val();
		//console.log(val);
		filterizr.filterizr('filter', val);
	}, 10);
	setTimeout(function() {
		clearInterval(intervalID);
	}, 1000);
}
