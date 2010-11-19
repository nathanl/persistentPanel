// ---------------------------------------------
// persistentPanel namespace
window.persistentPanel = {};

// ---------------------------------------------
// persistentPanel sidebar
// ---------------------------------------------

$.fn.persistentPanel = function(userOptions) {

	// -- Define default options and override with user-specified --
	//
	// Expose this for external modification
	$.fn.persistentPanel.defaults = {
		openDirection: 'down',
		// Find toggler element inside self
		toggler: $('.toggler',$(this)),
		togglerClassOpen: 'open',
		togglerClassClosed: 'closed',
		animateFunction: 'TODO'
	};
	// Shorter name for internal use
	var defaults = $.fn.persisentPanel.defaults;

	// Merging into an empty hash doesn't modify defaults
	var settings = $.extend({}, defaults, userOptions);

	// Some default unicode arrows to use in toggler
	var toggleContentDefaults = {
		'up':			{'closed': '&#25BC', 'open': '&#25B2'},
		'down':		{'closed': '&#25B2', 'open': '&#25BC'},
		'left':		{'closed': '&#25C0', 'open': '&#25B6'},
		'right':	{'closed': '&#25B6', 'open': '&#25C0'},
	};
	/*
	var toggleContentDefaults = {
		'up':			{'closed': 'V', 'open': '^'},
		'down':		{'closed': '^', 'open': 'V'},
		'left':		{'closed': '<', 'open': '>'},
		'right':	{'closed': '>', 'open': '<'},
	};
	*/

	// If user didn't specify toggle Contents or disable them, use default ones
	if (!settings['togglerContentsOpen'] && !settings['noTogglerContents']) {
		settings.toggleContentOpen = toggleContentDefaults[settings.openDirection['open']];
	}
	if (!settings['togglerContentsClosed'] && !settings['noTogglerContents']) {
		settings.toggleContentClosed = toggleContentDefaults[settings.openDirection['closed']];
	}
};

/*

persistentPanel.sideBar = {

	element: $('#sidebar'),
	button: $('.expander a',this.element),
	isOpen: false,

	initialize: function(){
		var sideBarLeftOpen = $.cookie('sideBarIsOpen');

		// If the cookie says it's closed or there's no cookie
		if (sideBarLeftOpen != 'true') {
			this.close(0);
		} else {
			// Running this makes sure the button looks correct
			this.open(0);
		}

	},

	close: function(ms) {
					 this.element.animate({left:'-20%'}, {duration: ms});
					 $('#main').animate({left:'-20%'}, {duration: ms});

					 // Use right-arrow unicode character
					 this.element.find('.expander a').removeClass('close').addClass('open').html('&#9656;');

					 // Save state in object and in a cookie (requires jquery.cookie.js)
					 this.isOpen = false;
					 $.cookie('sideBarIsOpen', 'false', { expires: 30, path: '/'});
				 },

	open: function(ms) {
					this.element.animate({left:'0%'}, {duration: ms});
					$('#main').animate({left:'0%'}, {duration: ms});

					// Use left-arrow unicode character
					this.element.find('.expander a').removeClass('open').addClass('close').html('&#9666;');

					// Save state in object and in a cookie (requires jquery.cookie.js)
					this.isOpen = true;
					$.cookie('sideBarIsOpen', 'true', { expires: 30, path: '/'});
				},

	toggle: function(ms) {
						this.isOpen ? this.close(ms) : this.open(ms);
					}
};

persistentPanel.sideBar.button.click(function(e){
	persistentPanel.sideBar.toggle(300);
	e.preventDefault();
});
*/
