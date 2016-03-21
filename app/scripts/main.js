(function(){
    'use strict';
    
    var isMobile = (function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    })();
	
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};
	
$('[data-type="modal-trigger"]').on('click', function(){
		var actionBtn = $(this),
			scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));
		
		actionBtn.addClass('to-circle');
		actionBtn.next('.cd-modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
		});

		//if browser doesn't support transitions...
		if(actionBtn.parents('.no-csstransitions').length > 0 ) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
        
        $('.navbar.navbar-default.custom-header').hide(); 
	});

	//trigger the animation - close modal window
	$('.cd-section .cd-modal-close').on('click', function(){
		closeModal();
	});
	$(document).keyup(function(event){
		if(event.which=='27') closeModal();
	});

	$(window).on('resize', function(){
		//on window resize - update cover layer dimention and position
		if($('.cd-section.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
	});
    
    

	function retrieveScale(btn) {
		var btnRadius = btn.width()/2,
			left = btn.offset().left + btnRadius,
			top = btn.offset().top + btnRadius - $(window).scrollTop(),
			scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

		btn.css('position', 'fixed').velocity({
			top: top - btnRadius,
			left: left - btnRadius,
			translateX: 0,
		}, 0);

		return scale;
	}

	function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
		var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
			maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
		return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
	}

	function animateLayer(layer, scaleVal, bool) {
		layer.velocity({ scale: scaleVal }, 400, function(){
			$('body').toggleClass('overflow-hidden', bool);
			(bool) 
				? layer.parents('.cd-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend')
				: layer.removeClass('is-visible').removeAttr( 'style' ).siblings('[data-type="modal-trigger"]').removeClass('to-circle');
		});
	}

	function updateLayer() {
		var layer = $('.cd-section.modal-is-visible').find('.cd-modal-bg'),
			layerRadius = layer.width()/2,
			layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
			layerLeft = layer.siblings('.btn').offset().left + layerRadius,
			scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());
		
		layer.velocity({
			top: layerTop - layerRadius,
			left: layerLeft - layerRadius,
			scale: scale,
		}, 0);
	}

	function closeModal() {
		var section = $('.cd-section.modal-is-visible');
        $('.cd-section.modal-is-visible iframe').attr("src", $(".cd-section.modal-is-visible iframe").attr("src"));
		section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			animateLayer(section.find('.cd-modal-bg'), 1, false);
		});
		//if browser doesn't support transitions...
		if(section.parents('.no-csstransitions').length > 0 ) animateLayer(section.find('.cd-modal-bg'), 1, false);
        
        setTimeout(function(){ 
            $('.navbar.navbar-default.custom-header').show(); 
        }, 1000);
	}
	
	
	var wow = new WOW({
		offset: 200, // default
        mobile: false
	});
	wow.init();
	function numbers(id, from, to) {
		//console.log(id);
		this.theId = id,
		this.theFrom = from,
		this.theTo = to,
		this.init(); 
	}
	numbers.prototype.init =  function() {
		//console.log('trigger plugin');
		//setTimeout( function() {
			$(this.theId).countTo({
				from:  this.theFrom,
				to:    this.theTo,
				speed: 2000
			});
		//}, 2000);
	}
	var numbersSeen = {
		rw_stat_num: false,
		hf_stat_num: false,
		gg_stat_num: false,
		ff_stat_num: false,
		fv_stat_num: false
	};
    function checkNav() {
        if ($(document).scrollTop() > 25) {
            $('#food-logo').fadeOut();
            $('#plain-logo').fadeIn();
        } 
        else {
            $('#food-logo').fadeIn();
            $('#plain-logo').fadeOut();
        }
    }
	$(window).bind("scroll", function(event) {
		if (!(isMobile)) {
			checkNav(); 
		}
        
		var numCheck = $(".stat-num:in-viewport");
		//console.log(numCheck.length);
		if(numCheck.length) {
			var theID = $(numCheck).attr('id');
			var thePercent;
			switch(theID) {
				case 'rw_stat_num':
					thePercent = 35;
					break;
				case 'hf_stat_num':
					thePercent = 75;
					break;
				case 'gg_stat_num':
					thePercent = 86;
					break;
				case 'ff_stat_num':
					thePercent = 1;
					break;
				case 'fv_stat_num':
					thePercent = 12;
					break;
				default:
					thePercent = 0; 
			}
			if (numbersSeen[theID] === false) {
				var theSelectorID = '#' + theID; 
				var number = new numbers(theSelectorID,0,thePercent);
				numbersSeen[theID] = true;
			}
		}
	});
    
    $('#grid').mediaBoxes({
		filterContainer: '.filters',
		search: '#search',
		boxesToLoadStart: 8,
		boxesToLoad: 5,
		horizontalSpaceBetweenBoxes: 20,
		verticalSpaceBetweenBoxes: 20,
		overlayEffect: 'direction-aware-fade'
	}); 
	
    $(document).on("click", '.page-scroll', function(event) { 
        event.preventDefault();
        var $anchor = $(this),
			$anchorHref = $anchor.attr('href'),
			anchorFilter = '.' + $anchor.data('filter');
        $('html, body').animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1250, 'easeInOutExpo');
    });
})();




