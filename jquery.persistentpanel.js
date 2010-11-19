// ---------------------------------------------
// persistentPanel sidebar
// ---------------------------------------------

/*
* $('#panel').persistentPanel();
*
* $('#panel').persistentPanel({toggler: $('.togglerThing',this)});
*
*
* */
(function( $ ) {
	$.fn.persistentPanel = function(userOptions) {
		panel = this;
		// -- Define default options and override with user-specified --
		//
		// Short name for internal use & expose for external modification
		var defaults = $.fn.persistentPanel.defaults = {
			openDirection: 'down',
			// Find toggler element inside self
			toggler: '#toggler',
			togglerClassOpen: 'open',
			togglerClassClosed: 'closed',
			noTogglerContents: false,
			// Functions
			getStatusCookie: function() {return $.cookie('persistentPanelOpen');},
			setCookieOpen:  function() {$.cookie('persistentPanelOpen', 'true', { expires: 30, path: '/'})},
			setCookieClosed: function() {$.cookie('persistentPanelOpen', 'false', { expires: 30, path: '/'})},
			openFunction: function(speed) {panel.show(speed); },
			closeFunction: function(speed) {panel.hide(speed);},
			speed: 500
		};

		// Merging into an empty hash doesn't modify defaults
		var settings = $.extend({}, defaults, userOptions);

		// Some default unicode arrows to use in toggler
		var toggleContentDefaults = $.fn.persistentPanel.toggleContentDefaults = {
			//								    ▼    						  ▲	
			'up':			{'closed': '&#25BC', 'open': '&#25B2'},
			//								    ▲    						  ▼	
			'down':		{'closed': '&#25B2', 'open': '&#25BC'},
			//								    ◀                 ▶ 
			'left':		{'closed': '&#25C0', 'open': '&#25B6'},
			//								    ▶                 ◀ 
			'right':	{'closed': '&#25B6', 'open': '&#25C0'},
		};

		// If user didn't specify toggle contents or disable them, use default ones
		if (!settings['togglerContentsOpen'] && !settings['noTogglerContents']) {
			settings.toggleContentOpen = toggleContentDefaults[settings.openDirection['open']];
		}
		if (!settings['togglerContentsClosed'] && !settings['noTogglerContents']) {
			settings.toggleContentClosed = toggleContentDefaults[settings.openDirection['closed']];
		}

		var isOpen = true;

		var open = function() {
			// TODO: do this like settings.openFunction();
			settings['openFunction'].call();
			settings['setCookieOpen'].call();
			isOpen = true;
			// TODO: Set toggler contents
		}

		var close = function() {
			settings['closeFunction'].call();
			settings['setCookieClosed'].call();
			isOpen = false;
			// TODO: Set toggler contents
		};

		$(settings['toggler']).click(function(){
			cookieSetOpen = settings['getStatusCookie'].call();
			console.log(cookieSetOpen);
			if (isOpen) {
				close();
			} else {
				open();
			}
		});

		// Intialize open/closed state on page load
		// TODO: FIX THIS!!
		cookieSetOpen = settings['getStatusCookie'].call();
		if (!cookieSetOpen) {
			close();
		}

		// Maintain chainability
		return this;
	};
})( jQuery );
