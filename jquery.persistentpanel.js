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
			changeTogglerContents: true
      ,cookieName: 'persistentPanel'
			,openDirection: 'down'
			,speed: 500
			,toggler: '#toggler'
			,togglerClassClosed: 'closed'
			,togglerClassOpen: 'open'
			// Functions
			,getStatusCookie: function() {return $.cookie(settings.cookieName) === "open" ? true : false;}
			,setCookieOpen:  function() {$.cookie(settings.cookieName, 'open', { expires: 30, path: '/'})}
			,setCookieClosed: function() {$.cookie(settings.cookieName, 'closed', { expires: 30, path: '/'})}
			,openFunction: function(speed) {panel.show(speed);}
			,closeFunction: function(speed) {panel.hide(speed);}
		};

		// Merging into an empty hash doesn't modify defaults
		var settings = $.extend({}, defaults, userOptions);

		// Some default unicode arrows to use in toggler
		var togglerContentsDefaults = $.fn.persistentPanel.togglerContentsDefaults = {
			//								    ▼    						  ▲	
			'down':			{'closed': '&#x25BC', 'open': '&#x25B2'}
			//								    ▲    						  ▼	
			,'up':		{'closed': '&#x25B2', 'open': '&#x25BC'}
			//								    ◀                 ▶ 
			,'right':		{'closed': '&#x25C0', 'open': '&#x25B6'}
			//								    ▶                 ◀ 
			,'left':	{'closed': '&#x25B6', 'open': '&#x25C0'}
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

		var open = function(speed) {
      settings['openFunction'].call(panel, speed === undefined ? settings.speed : speed);
      settings['setCookieOpen'].call(panel);
			isOpen = true;
			if (settings.changeTogglerContents){
				$(settings.toggler).html(settings.togglerContentsOpen);
			}
      $(settings.toggler).removeClass(settings.togglerClassClosed).addClass(settings.togglerClassOpen);
		}

		var close = function(speed) {
			settings['closeFunction'].call(panel, speed === undefined ? settings.speed : speed);
			settings['setCookieClosed'].call(panel);
			isOpen = false;
			if (settings.changeTogglerContents){
				$(settings.toggler).html(settings.togglerContentsClosed);
			}
      $(settings.toggler).removeClass(settings.togglerClassOpen).addClass(settings.togglerClassClosed);
		};

		$(settings.toggler).click(function(){
			cookieSetOpen = settings['getStatusCookie'].call(panel);
			if (isOpen) {
				close();
			} else {
				open();
			}
		});

    // TODO: Add option to decide if default state is open or closed
    var initialize = function(){
      // Decide if panel should initially be open or closed
      var cookieSetOpen = settings['getStatusCookie'].call(panel);
      if (!cookieSetOpen) {
        close(0);
        if (settings.changeTogglerContents){
          $(settings.toggler).html(settings.togglerContentsClosed);
        }
      } else {
        open(0);
        if (settings.changeTogglerContents){
          $(settings.toggler).html(settings.togglerContentsOpen);
        }
      }
    }

    // Get things started
    initialize();

		// Maintain chainability
		return this;
	};
})( jQuery );
