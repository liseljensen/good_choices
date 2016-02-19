/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function() {
	console.log('init');
	'use strict';

	var bodyEl = document.body,
		docElem = window.document.documentElement,
		// http://stackoverflow.com/a/1147768
		docWidth = Math.max(bodyEl.scrollWidth, bodyEl.offsetWidth, docElem.clientWidth, docElem.scrollWidth, docElem.offsetWidth),
		docHeight = Math.max(bodyEl.scrollHeight, bodyEl.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	function Circle(el) {
		this.el = $(el);
		//console.log(this.el);
		this.actionOpenButton = this.el.find('.action--open');
		this._initEvents();
	}
	Circle.prototype._initEvents = function() {
		var self = this;
		console.log(self.el);
		this.actionOpenButton.on('click', function(ev) {
			console.log('click');
			self._openContent(self.el);
				ev.target.blur();
		});
	}
	$('.slide').each(function(el) { 
		var el = this;
		var circles =  new Circle(el); 
		//console.log('each slide');
	});

	/**
	 * Circle Slideshow
	 */
//	function Circle(el, options) {
//		console.log("the el" + el);
//		this.el = el;
//		this.options = extend( {}, this.options );
//		extend( this.options, options );
//
////		// items
//		//this.items = [].slice.call(this.el.getElementsByClassName('.slide'));
//		this.items = $('.slide');
////		// total items
//		this.itemsTotal = this.items.length;
////		if( this.itemsTotal < 2 ) return;
//
//		// content close control
//		this.closeCtrl = this.el.querySelector('.action--close');
//		// index of current slide
//		this.current = 0;
//		// all items are closed initially 
//		this.isClosed = true;
//
//		this._init();
//	}
//
//	Circle.prototype.options = {};
//
//	Circle.prototype._init = function() {
//		// add the expander element per slide (.deco--expander)
////		this.items.forEach(function(item) {
////			var expanderEl = document.createElement('div');
////			expanderEl.className = 'deco deco--circle deco--expander';
////
////			var slideEl = item.querySelector('.slide__item');
////			slideEl.insertBefore(expanderEl, slideEl.firstChild);
////		});
////
////		// position current item:
////		classie.add(this.items[this.current], 'slide--current');
////		// event binding
//		this._initEvents();
//	};
//
//	Circle.prototype._initEvents = function() {
//		var self = this;
//
//		// opening items
//		this.items.forEach(function(item) {
//			item.querySelector('.action--open').addEventListener('click', function(ev) {
//				self._openContent(item);
//				ev.target.blur();
//			});
//		});
//
//		// closing items
//		this.closeCtrl.addEventListener('click', function() { self._closeContent(); });
//
//	};
//
	Circle.prototype._openContent = function(item) {
		console.log('the item: ' + $(item));
		this.isExpanded = true;
		this.isClosed = false;
		this.expandedItem = $(item);

		var self = this,
			
			//expanderEl = item.querySelector('.deco--expander'),
			expanderEl = $(item).find('.deco--expander'),
			scaleVal = Math.ceil(Math.sqrt(Math.pow(docWidth, 2) + Math.pow(docHeight, 2)) / expanderEl.offsetWidth),
			smallImgEl = $(item).find('.slide__img--small'),
			contentEl = $(item).find('.slide__content'),
			largeImgEl = $(contentEl).find('.slide__img--large'),
			titleEl = $(contentEl).find('.slide__title--main'),
			descriptionEl = $(contentEl).find('.slide__description'),
			priceEl = $(contentEl).find('.slide__price'),
			buyEl = $(contentEl).find('.button--buy');

		// add slide--open class to the item
		$(item).addClass('slide--open');
		//classie.add(item, 'slide--open');
		// prevent scrolling
		bodyEl.style.top = -scrollY() + 'px';
		$(bodyEl).addClass('lockscroll');
		
		console.log(largeImgEl);
		// position the content elements:
		// - image (large image)
		//dynamics.css($(contentEl).find('.slide__img--large'), {translateY : 800});
		// - title
//		dynamics.css(titleEl, {translateY : 600, opacity: 0});
//		// - description
//		dynamics.css(descriptionEl, {translateY : 400, opacity: 0});
//		// - price
//		dynamics.css(priceEl, {translateY : 400, opacity: 0});
//		// - buy button
//		dynamics.css(buyEl, {translateY : 400, opacity: 0});

		// animate (scale up) the expander element
		dynamics.animate(expanderEl, 
			{
				scaleX : scaleVal, scaleY : scaleVal
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.5,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.5,"y":1}]}], duration: 1700
			}
		);
		
		// animate the small image out
		dynamics.animate(smallImgEl, 
			{
				translateY : -600, opacity : 0
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 300, delay: 75
			}
		);

		// animate the large image in
		dynamics.animate(largeImgEl, 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 300
			}
		);

		// animate the title element in
		dynamics.animate(titleEl, 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 400
			}
		);

		// animate the description element in
		dynamics.animate(descriptionEl, 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 500
			}
		);

		// animate the price element in
		dynamics.animate(priceEl, 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 600
			}
		);

		// animate the buy element in
		dynamics.animate(buyEl, 
			{
				translateY : 0, opacity : 1
			}, 
			{
				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 700,
				complete: function() {
					// add .noscroll to body and .scrollable to .slide__content
					classie.add(bodyEl, 'noscroll');
					classie.add(contentEl, 'scrollable');
					
					// force redraw (chrome)
					contentEl.style.display = 'none';
					contentEl.offsetHeight;
					contentEl.style.display = 'block';
					
					// allow scrolling
					classie.remove(bodyEl, 'lockscroll');
				}
			}
		);
	};
//
//	Circle.prototype._closeContent = function() {
//		this.isClosed = true;
//
//		var self = this,
//			item = this.expandedItem,
//			expanderEl = item.querySelector('.deco--expander'),
//			smallImgEl = item.querySelector('.slide__img--small'),
//			contentEl = item.querySelector('.slide__content'),
//			largeImgEl = contentEl.querySelector('.slide__img--large'),
//			titleEl = contentEl.querySelector('.slide__title--main'),
//			descriptionEl = contentEl.querySelector('.slide__description'),
//			priceEl = contentEl.querySelector('.slide__price'),
//			buyEl = contentEl.querySelector('.button--buy');
//
//		// add slide--close class to the item
//		classie.add(item, 'slide--close');
//
//		// remove .noscroll from body and .scrollable from .slide__content
//		classie.remove(bodyEl, 'noscroll');
//		classie.remove(contentEl, 'scrollable');
//
//		// animate the buy element out
//		dynamics.stop(buyEl);
//		dynamics.animate(buyEl, 
//			{
//				translateY : 400, opacity : 0
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
//			}
//		);
//
//		// animate the price element out
//		dynamics.stop(priceEl);
//		dynamics.animate(priceEl, 
//			{
//				translateY : 400, opacity : 0
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000
//			}
//		);
//
//		// animate the description element out
//		dynamics.stop(descriptionEl);
//		dynamics.animate(descriptionEl, 
//			{
//				translateY : 400, opacity : 0
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 100
//			}
//		);
//
//		// animate the title element out
//		dynamics.stop(titleEl);
//		dynamics.animate(titleEl, 
//			{
//				translateY : 600, opacity : 0
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 1000, delay: 200
//			}
//		);
//
//		// animate the large image out
//		dynamics.animate(largeImgEl, 
//			{
//				translateY : 800, opacity : 0
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 500, delay: 300,
//				complete: function() {
//					// remove slide--open class to the item
//					classie.remove(item, 'slide--open');
//					// remove slide--close class to the item
//					classie.remove(item, 'slide--close');
//					// allow scrolling
//					classie.remove(bodyEl, 'lockscroll');
//					self.isExpanded = false;
//				}
//			}
//		);
//
//		// animate the small image in
//		dynamics.animate(smallImgEl, 
//			{
//				translateY : 0, opacity : 1
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}], duration: 700, delay: 500
//			}
//		);
//
//		// animate (scale down) the expander element
//		dynamics.animate(expanderEl, 
//			{
//				scaleX : 1, scaleY : 1
//			}, 
//			{
//				type: dynamics.bezier, points: [{"x":0,"y":0,"cp":[{"x":0.5,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.5,"y":1}]}], duration: 700, delay: 250
//			}
//		);
//	};
//
//	window.Circle = Circle;

})();