;( function( $, window, undefined ) {

	'use strict';

	// global

	var settings = {};
	
	var els = {};


	var methods = {
		_init : function( options ) {
			methods.$el = $(this);
			
			methods._events();
			
			methods.options = $.extend(true, {
				'main_layout': 0,
				'header_type': 0,
				'footer_type': 0,
				'activecol': 1,
				'background_img': 0,
				'font': 1,
			}, JSON.parse(params.newModel));
			
			
			setTimeout(function(){
				$('.settings-slider').owlCarousel({
				  navigation: true,
			      items : 8, 
			      itemsDesktop : [1500,5], 
			      itemsDesktopSmall : [900,4], 
			      itemsTablet: [600,3], 
			      itemsMobile : false ,
			      rewindNav: false
				});
				$('.variants-slider').each(function(){
					var items = 5;
					var desktopItems = 4;
					if($(this).data('slider-items')) {
						items = $(this).data('slider-items');
					}
					if($(this).data('slider-desktop-items')) {
						desktopItems = $(this).data('slider-desktop-items');
					}
					$(this).owlCarousel({
						items: items,
						itemsDesktopSmall: [1369,desktopItems],
						rewindNav: false,
						navigation: true,
					}).css('display','');
				});
				
				
			}, 1);
			setTimeout(function(){
				methods.$el.removeClass('hidden-initially');
			}, 100);
			
			els.$applyBtn = methods.$el.find('.etheme_cp_btn_apply');
			
			//methods.openPanel();
			
			return this;

		},
		
		_events: function () {
		
			methods.$el.on('click', '.etheme_cp_head', function() {
				methods.openPanel();
			});
			
			methods.$el.on('click', '.set-btn', function(e) {
				methods.setBtnClick(e);
			});
			
			methods.$el.on('click', '.set-select', function(e) {
				methods.setSelectClick(e);
			});
			
			methods.$el.on('click', '.etheme_cp_btn_live', function(e) {
				methods.showLiveChat(e);
			});
			
			$('html').on('click', '.open-tooltip', function(e) {
				methods.openTooltip(e);
			});
			$('html').on('click', '.hidden-tooltip .tooltip-content .btn-close', function(e) {
				methods.openTooltip(e);
			});
			
			$('html').on('dblclick', 'body', function(e) {
				//methods.showCredentials(e);
			});
		},
		
		showCredentials: function(e) {
			$("html, body").animate({scrollTop:0}, '1000', 'swing', function() { 
				$('body').addClass('shown-credentials');
			});
			
		},
		
		
		openTooltip: function(e) {
			e.preventDefault();
			var $this = $(e.currentTarget);
			$this = $this.parents('.hidden-tooltip').find('.open-tooltip');
			var tooltipContent = $this.next();
			if(tooltipContent.hasClass('opened-tooltip')) {
				tooltipContent.removeClass('opened-tooltip');
				tooltipContent.hide(300);
			} else {
				tooltipContent.addClass('opened-tooltip');
				tooltipContent.show(300);
			}
			
			return this;
		},
		
		setBtnClick: function(e) {
			var $this = $(e.currentTarget);
			var field = $this.data('setvalue');
			var value = $this.data('value');
			if(field == 'background_img') {
		    	methods.options['main_layout'] = 1;
			}
	    	methods.options[field] = value;
			methods.addParamsToLink(els.$applyBtn, true);
			
			methods.$el.find('.set-btn[data-setvalue="' + field + '"]').removeClass('selected');
			
			$this.addClass('selected');
			
			return this;
		},
		
		setSelectClick: function(e) {
			var $this = $(e.currentTarget);
			var varinatsSet = $this.data('variants-set');
			var variantsBlock = methods.$el.find('.etheme_cp_images_variants[data-variants-set="' + varinatsSet + '"]');
			methods.$el.find('.etheme_cp_variants_btn').removeClass('selected');
			
			if($this.hasClass('selected')) {
				variantsBlock.toggleClass('displayed');
				$this.toggleClass('selected');
			} else {
				methods.$el.find('.etheme_cp_images_variants').removeClass('displayed');
				variantsBlock.addClass('displayed');
				
				methods.$el.find('.set-select').removeClass('selected');
				$this.addClass('selected');
			}
			
			return this;
		},
		
		addParamsToLink: function (link, redirect) {
			var href = '';
			var href = link.attr('href');
		
			var newUrl = methods.updateURLParameter(href, 'et_styles', methods.getParams());
			
			link.attr('href', newUrl);
			if(redirect) {
				window.location = newUrl;
			}
			return link;
		},
		
		getParams: function() {
			var data = methods.options;
			
			var array = [];
			jQuery.each(data, function(i, val) {
				array.push(val);
			});
			array = array.join('-');
			
			
			return array;
		},
		
		openPanel: function () {
			
			methods.$el.find('.etheme_cp_images_variants').removeClass('displayed');
			methods.$el.find('.set-select').removeClass('selected');
			
			methods.$el.toggleClass('shownPanel');
			
			return this;
		},
		
		queryString: function () {
		  // This function is anonymous, is executed immediately and 
		  // the return value is assigned to QueryString!
		  var query_string = {};
		  var query = window.location.search.substring(1);
		  var vars = query.split("&");
		  for (var i=0;i<vars.length;i++) {
		    var pair = vars[i].split("=");
		    	// If first entry with this name
		    if (typeof query_string[pair[0]] === "undefined") {
		      query_string[pair[0]] = pair[1];
		    	// If second entry with this name
		    } else if (typeof query_string[pair[0]] === "string") {
		      var arr = [ query_string[pair[0]], pair[1] ];
		      query_string[pair[0]] = arr;
		    	// If third or later entry with this name
		    } else {
		      query_string[pair[0]].push(pair[1]);
		    }
		  } 
		    return query_string;
		},
		
		updateURLParameter: function(url, param, paramVal) {
		    var TheAnchor = null;
		    var newAdditionalURL = "";
		    var tempArray = url.split("?");
		    var baseURL = tempArray[0];
		    var additionalURL = tempArray[1];
		    var temp = "";
		
		    if (additionalURL) 
		    {
		        var tmpAnchor = additionalURL.split("#");
		        var TheParams = tmpAnchor[0];
		            TheAnchor = tmpAnchor[1];
		        if(TheAnchor)
		            additionalURL = TheParams;
		
		        tempArray = additionalURL.split("&");
		
		        for (var i=0; i<tempArray.length; i++)
		        {
		            if(tempArray[i].split('=')[0] != param)
		            {
		                newAdditionalURL += temp + tempArray[i];
		                temp = "&";
		            }
		        }        
		    }
		    else
		    {
		        var tmpAnchor = baseURL.split("#");
		        var TheParams = tmpAnchor[0];
		            TheAnchor  = tmpAnchor[1];
		
		        if(TheParams)
		            baseURL = TheParams;
		    }
		
		    if(TheAnchor)
		        paramVal += "#" + TheAnchor;
		
		    var rows_txt = temp + "" + param + "=" + paramVal;
		    return baseURL + "?" + newAdditionalURL + rows_txt;
		},
		
		showLiveChat: function(ev) {
			ev.preventDefault();
			var chatForm = jQuery('#chatform');
			var formBlock =jQuery('.to-chat-form');
			var height = formBlock.height();
			var headingHeight = formBlock.find('.chat-form-heading').height();
			
			if(formBlock.hasClass('shown')) {
				formBlock.css({
					bottom: -height+headingHeight
				}).removeClass('shown');
			}else{
				formBlock.css({
					bottom:50
				}).addClass('shown');
			}

			
		},
		
		
	}

	/* public functions */
	$.fn.ePanel = function(method) {

		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods._init.apply(this, arguments);
		} else {
			$.error('invalid method call!');
		}

    };


} )( jQuery, window );


jQuery(document).ready(function() {
	var ePanel = jQuery('.etheme_cp').ePanel();
});