// ---------------------------------------------
// persistentPanel v1.20
// A jQuery plugin by Nathan Long
// https://github.com/sleeplessgeek/persistentPanel
// ---------------------------------------------

(function( $ ) {
  $.fn.persistentPanel = function(userOptions) {
    var panel = $(this);
    // Define default options and override with user-specified
    //
    // Short name for internal use - exposed below for external modification
    var defaults = $.fn.persistentPanel.defaults;

    // Decide settings - Phase I
    // User settings overrule defaults, but merge both into an empty 
    // hash so that original defaults hash isn't modified
    var settings = $.extend(true, {}, defaults, userOptions);

    // Decide settings - Phase II. 
    //
    // First, ensure that we have a valid openDirection
    var o = settings.openDirection;
    if (!(o === 'up' || o === 'down' || o === 'left' || o === 'right')){
      settings.openDirection = 'down';
    }

    // Settings that depend on the open direction setting for their defaults
    // (If any of these already have values, we leave them alone)
    var toggles = defaults.toggles;
    switch (settings.openDirection) {

        case 'up':
          // Closed
          settings.closeFunction = settings.closeFunction || toggles.verticalClose;
          settings.togglerContents.closed = settings.togglerContents.closed || '&#x25B2'; // ▲

          // Open
          settings.openFunction = settings.openFunction || toggles.verticalOpen;
          settings.togglerContents.open = settings.togglerContents.open || '&#x25BC'; // ▼
          break;

        case 'down':
          // Closed
          settings.closeFunction = settings.closeFunction || toggles.verticalClose;
          settings.togglerContents.closed = settings.togglerContents.closed || '&#x25BC'; // ▼

          // Open
          settings.openFunction = settings.openFunction || toggles.verticalOpen;
          settings.togglerContents.open = settings.togglerContents.open || '&#x25B2'; // ▲
          break;

        case 'left':
          // Closed
          settings.closeFunction = settings.closeFunction || toggles.horizontalClose;
          settings.togglerContents.closed = settings.togglerContents.closed || '&#x25C0'; // ◀

          // Open
          settings.openFunction = settings.openFunction || toggles.horizontalOpen;
          settings.togglerContents.open = settings.togglerContents.open || '&#x25B6'; // ▶
          break;

        case 'right':
          // Closed
          settings.closeFunction = settings.closeFunction || toggles.horizontalClose;
          settings.togglerContents.closed = settings.togglerContents.closed || '&#x25B6'; // ▶

          // Open
          settings.openFunction = settings.openFunction || toggles.horizontalOpen;
          settings.togglerContents.open = settings.togglerContents.open || '&#x25C0'; // ◀
          break;
    }

    // Internal open and close functions - call the toggle function,
    // set cookie, change toggler contents (if applicable) and set toggler class
    var open = function(duration) {
      $.data(panel, 'persistentPanelState', 'open');
      settings['openFunction'].call(panel, duration === undefined ? settings.duration : duration);
      settings['setCookie'].call(panel, settings.cookieName, 'open');
      if (settings.togglerContents && settings.togglerContents.open){
        $(settings.toggler).html(settings.togglerContents.open);
      }
      if (settings.togglerClass) {
        $(settings.toggler).removeClass(settings.togglerClass.closed).addClass(settings.togglerClass.open);
      }
    };
    var close = function(duration) {
      $.data(panel, 'persistentPanelState', 'closed');
      settings['closeFunction'].call(panel, duration === undefined ? settings.duration : duration);
      settings['setCookie'].call(panel, settings.cookieName, 'closed');
      if (settings.togglerContents && settings.togglerContents.closed){
        $(settings.toggler).html(settings.togglerContents.closed);
      }
      if (settings.togglerClass) {
        $(settings.toggler).removeClass(settings.togglerClass.open).addClass(settings.togglerClass.closed);
      }
    };

    var initialize = function(){
      // Decide initial state on page load, based on cookie or defaultState setting
      var initialState, cookieVal;
      cookieVal =  settings.getCookie(settings.cookieName); 
      if (cookieVal === 'open' || cookieVal === 'closed') {
        initialState = cookieVal;
      } else if (settings.defaultState === 'open' || settings.defaultState === 'closed'){
        initialState = settings.defaultState;
      } else {
        initialState = 'open';
      }

      // Store that state in the DOM
      $.data(panel, 'persistentPanelState',initialState);

      // Decide if panel should initially be open or closed
      switch(initialState){
      case 'open':
        open(0);
        if (settings.togglerContents && settings.togglerContents.open){
          $(settings.toggler).html(settings.togglerContents.open);
        }
        break;
      case 'closed':
        close(0);
        if (settings.togglerContents && settings.togglerContents.closed){
          $(settings.toggler).html(settings.togglerContents.closed);
        }
        break;
      }
    };

    // Get things started
    initialize();

    // Add namespaced click event listener
    $(settings.toggler).bind('click.persistentPanel',function(e){
      e.preventDefault();
      e.stopPropagation();
      switch($.data(panel, 'persistentPanelState')) {
      case 'open':
        close();
        break;
      case 'closed':
        open();
        break;
      }
    });

    // Maintain chainability
    return this;
  };

  $.fn.persistentPanel.defaults = {
    togglerContents: {open: null, closed: null}, // To be determined by openDirection
    cookieName: 'persistentPanel',
    defaultState: 'closed',
    openDirection: 'down',
    duration: 500,
    toggler: '#panelToggler',
    togglerClass: {open: 'open', closed: 'closed'},
    // Functions
    getCookie:  function(cookieName) {return $.cookie(cookieName);},
    setCookie:  function(cookieName, value) {$.cookie(cookieName, value, { expires: 30, path: '/'});},
    toggles: {
      horizontalClose: function(duration){
        // Stash original width and display values before hiding
        $(this).data('width',$(this).width()); 
        $(this).data('display',$(this).css('display'));
        $(this).animate({width: 0, opacity: 0},duration,function(){$(this).css('display','none');});
      },

      horizontalOpen: function(duration){
        // Restore previous width and display values
        $(this).css('display',$(this).data('display'));
        $(this).animate({width: $(this).data('width'), opacity: 1},duration);
      }, 

      verticalClose: function(duration){
        $(this).slideUp(duration);
      },

      verticalOpen: function(duration){
        $(this).slideDown(duration);
      }
    }
  };
  $.fn.nonPersistentPanel = function(options) {
    // Useless, but callable, cookie functions
    options.setCookie = options.getCookie = function(){return null;}

    $(this).persistentPanel(options);
  }
})( jQuery );
