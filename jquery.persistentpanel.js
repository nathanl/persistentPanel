// ---------------------------------------------
// persistentPanel
// A jQuery plugin by Nathan Long (sleeplessgeek)
// ---------------------------------------------

(function( $ ) {
	$.fn.persistentPanel = function(userOptions) {
		var panel = $(this);
		// -- Define default options and override with user-specified --
		//
    $.fn.persistentPanel.defaults = {};
		// Short name for internal use & expose for external modification
		var defaults = $.fn.persistentPanel.defaults.settings = {
			changeTogglerContents: true,
      cookieName: 'persistentPanel',
      defaultStatus: 'closed',
			openDirection: 'down',
			speed: 50,
			toggler: '#toggler',
			togglerClassClosed: 'closed',
			togglerClassOpen: 'open',
			// Functions
      getCurrentState: function() {
        var cookieVal =  $.cookie(settings.cookieName); 
        return cookieVal !== null ? cookieVal : settings.defaultStatus;
      },
			setCookie:  function(value) {$.cookie(settings.cookieName, value, { expires: 30, path: '/'});},
		};

		// Merging into an empty hash doesn't modify defaults
		var settings = $.extend({}, defaults, userOptions);

    // If the user didn't specify a close function, use the open direction to decide
    if (!settings.closeFunction) {
      settings.closeFunction = (function(){
        switch (settings.openDirection) {
        case 'up':
          break;
        case 'down':
          return function(speed){
            panel.slideUp(speed);
          };
        case 'left':
          break;
        case 'right':
          return function(speed){
            // Stash original width and display values before hiding
            panel.data('width',panel.width()); 
            panel.data('display',panel.css('display'));
            panel.animate({width: 0, opacity: 0},speed,function(){$(this).css('display','none');});
          };
        }
      }());
    }

    // If the user didn't specify an open function, use the open direction to decide
    if (!settings.openFunction) {
      settings.openFunction = (function(){
        switch (settings.openDirection) {
        case 'up':
          break;
        case 'down':
          return function(speed){
            panel.slideDown(speed);
          };
          break;
        case 'left':
          break;
        case 'right':
          return function(speed){
            // Restore previous width and display values
            panel.css('display',panel.data('display'));
            panel.animate({width: panel.data('width'), opacity: 1},speed);
          };
        }
      }());
    }

		// Some default unicode arrows to use in toggler
		var togglerContentsDefaults = $.fn.persistentPanel.defaults.togglerContents = {
			//								    ▼    						  ▲	
			'down':			{'closed': '&#x25BC', 'open': '&#x25B2'},
			//								    ▲    						  ▼	
			'up':		{'closed': '&#x25B2', 'open': '&#x25BC'},
			//								    ◀                 ▶ 
			'right':		{'closed': '&#x25C0', 'open': '&#x25B6'},
			//								    ▶                 ◀ 
			'left':	{'closed': '&#x25B6', 'open': '&#x25C0'}
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

    // Internal open and close functions - call the user's function (if any),
    // set cookie, change toggler contents (if applicable) and set toggler class
		var open = function(speed) {
      settings['openFunction'].call(panel, speed === undefined ? settings.speed : speed);
      settings['setCookie'].call(panel, 'open');
			if (settings.changeTogglerContents){
				$(settings.toggler).html(settings.togglerContentsOpen);
			}
      $(settings.toggler).removeClass(settings.togglerClassClosed).addClass(settings.togglerClassOpen);
		};
		var close = function(speed) {
			settings['closeFunction'].call(panel, speed === undefined ? settings.speed : speed);
			settings['setCookie'].call(panel, 'closed');
			if (settings.changeTogglerContents){
				$(settings.toggler).html(settings.togglerContentsClosed);
			}
      $(settings.toggler).removeClass(settings.togglerClassOpen).addClass(settings.togglerClassClosed);
		};


    var initialize = function(){
      // Decide if panel should initially be open or closed
      switch(settings.getCurrentState.call()){
      case 'open':
        open(0);
        if (settings.changeTogglerContents){
          $(settings.toggler).html(settings.togglerContentsOpen);
        }
        break;
      case 'closed':
        close(0);
        if (settings.changeTogglerContents){
          $(settings.toggler).html(settings.togglerContentsClosed);
        }
        break;
      default:
        console.log('no state!');
        break;
      }
    };

    // Get things started
    initialize();

    // Add click event listener
		$(settings.toggler).click(function(){
      switch(settings.getCurrentState.call()) {
      case 'open':
        close();
        break;
      case 'closed':
        open();
        break;
      default:
        console.log('no state!');
        break;
      }
		});

		// Maintain chainability
		return this;
	};
})( jQuery );
