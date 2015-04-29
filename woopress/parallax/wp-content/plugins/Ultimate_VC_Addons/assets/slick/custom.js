jQuery(document).ready(function(){
	jQuery(".ult-carousel-wrapper").each(function(){
		var $this = jQuery(this);
		if($this.hasClass("ult_full_width")){
			var w = jQuery("html").outerWidth();
			var cw = $this.width();
			var left = (w - cw)/2;
			$this.css({"position":"relative","left":"-"+left+"px","width":w+"px"});
		}
	});
});
jQuery(window).resize(function(){
	jQuery(".ult-carousel-wrapper").each(function(){
		var $this = jQuery(this);
		if($this.hasClass("ult_full_width")){
			$this.removeAttr("style");
			var w = jQuery("html").outerWidth();
			var cw = $this.width();
			var left = (w - cw)/2;
			$this.css({"position":"relative","left":"-"+left+"px","width":w+"px"});
		}
	});
});