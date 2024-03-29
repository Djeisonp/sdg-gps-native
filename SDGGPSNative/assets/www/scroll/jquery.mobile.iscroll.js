(function($) {
$(function() {
/*
var SafariWindowHeightFix = 34; // XXX:
*/

var SafariWindowHeightFix = 34; // XXX:

function fixed(elm) {
	if (elm.data("iscroll-plugin")) {
		return;
	}

	// XXX: fix crumbled css in transition changePage 
	// for jquery mobile 1.0a3 in jquery.mobile.navigation.js changePage
	//  in loadComplete in removeContainerClasses in .removeClass(pageContainerClasses.join(" "));
	elm.css({
		overflow: 'hidden'
	});

	var barHeight = 0;
	var $header = elm.find('[data-role="header"]');
	if ($header.length) {
		$header.css({
			"z-index": 1000,
			padding: 0,
			width: "100%"
		});
		barHeight += $header.height();
	}

	var $footer = elm.find('[data-role="footer"]');
	if ($footer.length) {
		$footer.css({
			"z-index": 1000,
			padding: 0,
			width: "100%"
		});
		barHeight += $footer.height();
	}

	var $wrapper = elm.find('[data-role="content"]');
	if ($wrapper.length) {
		$wrapper.css({
			"z-index": 1
		});
		$wrapper.height($(window).height() - barHeight - SafariWindowHeightFix);
		$wrapper.bind('touchmove', function (e) { e.preventDefault(); });
	}

	var scroller = elm.find('[data-iscroll="scroller"]').get(0);
	if (scroller) {
		var iscroll = new iScroll(scroller, {desktopCompatibility:true});
		elm.data("iscroll-plugin", iscroll);
	}
}
$('[data-role="page"][data-iscroll="enable"]').live("pageshow", function() {
	fixed($(this));
});
if ($.mobile.activePage.data("iscroll") == "enable") {
	fixed($.mobile.activePage);
}

});
})(jQuery);