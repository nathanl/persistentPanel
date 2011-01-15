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
		var panel = $(this);
		// -- Define default options and override with user-specified --
		//
		// Short name for internal use & expose for external modification
		var defaults = $.fn.persistentPanel.defaults = {
			openDirection: 'down',
			// Find toggler element inside self
			toggler: '#toggler',
			togglerClassOpen: 'open',
			togglerClassClosed: 'closed',
			changeTogglerContents: true,
			// Functions
			getStatusCookie: function() {return $.cookie('persistentPanelOpen') === "true" ? true : false;},
      // TODO: Set/Get distinct cookie value for each panel on page
			setCookieOpen:  function() {$.cookie('persistentPanelOpen', 'true', { expires: 30, path: '/'})},
			setCookieClosed: function() {$.cookie('persistentPanelOpen', 'false', { expires: 30, path: '/'})},
			openFunction: function(speed) {panel.show(speed); },
			closeFunction: function(speed) {panel.hide(speed);},
			speed: 500
		};

		// Merging into an empty hash doesn't modify defaults
		var settings = $.extend({}, defaults, userOptions);

		// Some default unicode arrows to use in toggler
		var togglerContentsDefaults = $.fn.persistentPanel.togglerContentsDefaults = {
			//								    ▼    						  ▲	
			'down':			{'closed': '&#x25BC', 'open': '&#x25B2'},
			//								    ▲    						  ▼	
			'up':		{'closed': '&#x25B2', 'open': '&#x25BC'},
			//								    ◀                 ▶ 
			'right':		{'closed': '&#x25C0', 'open': '&#x25B6'},
			//								    ▶                 ◀ 
			'left':	{'closed': '&#x25B6', 'open': '&#x25C0'},
		};

		// If user didn't specify toggle contents or disable them, use default ones
		if (settings.changeTogglerContents){
			if (!settings['togglerContentsOpen']) {
				settings.togglerContentsOpen = settings.togglerConentsOpen || togglerContentsDefaults[settings.openDirection]['open'];
			}
			if (!settings['togglerContentsClosed']) {
				settings.togglerContentsClosed = settings.togglerContentsClosed || togglerContentsDefaults[settings.openDirection]['closed'];
			}
		}

		var isOpen = true;

		var open = function() {
			// TODO: do this like settings.openFunction();
			settings['openFunction'].call(panel);
			settings['setCookieOpen'].call(panel);
			isOpen = true;
			if (settings.changeTogglerContents){
				$(settings.toggler).html(settings.togglerContentsOpen);
			}
		}

		var close = function() {
			settings['closeFunction'].call(panel);
			settings['setCookieClosed'].call(panel);
			isOpen = false;
			if (settings.changeTogglerContents){
				$(settings.toggler).html(settings.togglerContentsClosed);
			}
		};

		$(settings.toggler).click(function(){
			cookieSetOpen = settings['getStatusCookie'].call(panel);
			if (isOpen) {
				close();
			} else {
				open();
			}
		});

		var cookieSetOpen = settings['getStatusCookie'].call(panel);
		if (!cookieSetOpen) {
			close();
		}

		// Maintain chainability
		return this;
	};
})( jQuery );
