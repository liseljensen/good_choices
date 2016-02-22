(function(){
    'use strict';
    var theScroll;
	var bodyEl = document.body,
		docElem = window.document.documentElement,
		docWidth = Math.max(bodyEl.scrollWidth, bodyEl.offsetWidth, docElem.clientWidth, docElem.scrollWidth, docElem.offsetWidth),
		docHeight = Math.max(bodyEl.scrollHeight, bodyEl.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop
	}
    function getScrollValue() {
        theScroll = scrollY(); 
    }
    function CircleProps(thisSlide) {
        this.slide = $(thisSlide); 
        this.whichSlide = this.slide.attr('id');
        this.action = this.slide.find('.action');
        this.close = this.slide.siblings('.action--close');
        this.isClosed = true;
        this.addClickListener();
        this.init(); 
    }
    CircleProps.prototype.init = function() {
        //this.slide.find('.slide__item').prepend('<div class="deco deco--circle deco--expander"></div>');
	};
    
    CircleProps.prototype.addClickListener = function() {
        //this is the CircleProps object
        var theSlide = this;
        console.log(theSlide);
        $(this.action).click(function(ev){
            //this is the button
            //alert(this);
            theSlide.openContent();
            ev.target.blur();
        });
        $(this.close).click(function(ev){
           theSlide.closeContent();  
        });
    };
    
    CircleProps.prototype.openContent = function() {
        //this is the CircleProps object
       
        this.isExpanded = true;
        this.isClosed = false;
        this.expandedItem = this;
        
        getScrollValue();
        
        var expanderEl = this.slide.find('.deco--expander'),
            scaleVal = Math.ceil(Math.sqrt(Math.pow(docWidth, 2) + Math.pow(docHeight, 2)) / expanderEl[0].offsetWidth),
			smallImgEl = this.slide.find('.slide__img--small'),
			contentEl = this.slide.find('.slide__content'),
			largeImgEl = $(contentEl).find('.slide__img--large'),
			titleEl = $(contentEl).find('.slide__title--main'),
			descriptionEl = $(contentEl).find('.slide__description'),
			priceEl = $(contentEl).find('.slide__price'),
			buyEl = $(contentEl).find('.button--buy');
        
        $(this.slide).addClass('slide--open');
        bodyEl.style.top = -scrollY() + 'px';
		$(bodyEl).addClass('lockscroll');
        
        // position the content elements:
		// - image (large image)
		dynamics.css(largeImgEl[0], {translateY : 800, opacity: 0});
		// - title
		dynamics.css(titleEl[0], {translateY : 600, opacity: 0});
		// - description
		dynamics.css(descriptionEl[0], {translateY : 400, opacity: 0});
		// - price
		dynamics.css(priceEl[0], {translateY : 400, opacity: 0});
		// - buy button
		dynamics.css(buyEl[0], {translateY : 400, opacity: 0});
        
        // animate (scale up) the expander element
		dynamics.animate(expanderEl[0], 
			{
				scaleX : scaleVal, scaleY : scaleVal
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.5,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.5,"y":1}]}], duration: 1700
			}
		);
    
        // animate the small image out
		dynamics.animate(smallImgEl[0], 
			{
				translateY : -600, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 300, delay: 75
			}
		);
        
        // animate the large image in
		dynamics.animate(largeImgEl[0], 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 300
			}
		);
        // animate the title element in
		dynamics.animate(titleEl[0], 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 400
			}
		);
        // animate the description element in
		dynamics.animate(descriptionEl[0], 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 500
			}
		);
        // animate the price element in
		dynamics.animate(priceEl[0], 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 600
			}
		);
        // animate the buy element in
		dynamics.animate(buyEl[0], 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 700,
				complete: function() {
					// add .noscroll to body and .scrollable to .slide__content
                    $(bodyEl).addClass('noscroll');
                    $(contentEl).addClass('scollable');
					
					// force redraw (chrome)
					contentEl[0].style.display = 'none';
					contentEl[0].offsetHeight;
					contentEl[0].style.display = 'block';
					
					// allow scrolling
                    $(bodyEl).removeClass('noscroll');
                    
				}
			}
		);
    }
    
    CircleProps.prototype.closeContent = function() {
		this.isClosed = true;

        var expanderEl = this.slide.find('.deco--expander'),
			smallImgEl = this.slide.find('.slide__img--small'),
			contentEl = this.slide.find('.slide__content'),
			largeImgEl = $(contentEl).find('.slide__img--large'),
			titleEl = $(contentEl).find('.slide__title--main'),
			descriptionEl = $(contentEl).find('.slide__description'),
			priceEl = $(contentEl).find('.slide__price'),
			buyEl = $(contentEl).find('.button--buy');
        
        $(this.slide).addClass('slide--close');

		$(bodyEl).removeClass('noscroll');
        $(contentEl).removeClass('scrollable');

		// animate the buy element out
		dynamics.stop(buyEl[0]);
		dynamics.animate(buyEl[0], 
			{
				translateY : 400, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
			}
		);

		// animate the price element out
		dynamics.stop(priceEl[0]);
		dynamics.animate(priceEl[0], 
			{
				translateY : 400, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
			}
		);

		// animate the description element out
		dynamics.stop(descriptionEl[0]);
		dynamics.animate(descriptionEl[0], 
			{
				translateY : 400, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 100
			}
		);

		// animate the title element out
		dynamics.stop(titleEl[0]);
		dynamics.animate(titleEl[0], 
			{
				translateY : 600, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 200
			}
		);

		// animate the large image out
		dynamics.animate(largeImgEl[0], 
			{
				translateY : 800, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 500, delay: 300,
				complete: function() {
                    
                    
					// remove slide--open class to the item
                    $('.slide').removeClass('slide--open');
					// remove slide--close class to the item
                    $('.slide').removeClass('slide--close');
					// allow scrolling
                    $(bodyEl).removeClass('lockscroll');
                    $(bodyEl).scrollTop(theScroll);
					this.isExpanded = false;
				}
			}
		);

		// animate the small image in
		dynamics.animate(smallImgEl[0], 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 700, delay: 500
			}
		);

		// animate (scale down) the expander element
		dynamics.animate(expanderEl[0], 
			{
				scaleX : 1, scaleY : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.5,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.5,"y":1}]}], duration: 700, delay: 250
			}
		);
	};

    $('.slide').each(function() {
       var Circle = new CircleProps(this);
    });
    
})();




