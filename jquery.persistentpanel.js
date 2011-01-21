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
    // TODO: These should be accesible for modification from the outside,
    // without getting replaced every time the plugin is run, yet
    // also have access to the settings object on the inside
    var defaults = $.fn.persistentPanel.defaults.settings = {
      changeTogglerContents: true,
      cookieName: 'persistentPanel',
      defaultStatus: 'open',
      openDirection: 'down',
      speed: 500,
      toggler: '#toggler',
      togglerClassClosed: 'closed',
      togglerClassOpen: 'open',
      // Functions
      getCookie:  function() {return $.cookie(settings.cookieName);},
      setCookie:  function(value) {$.cookie(settings.cookieName, value, { expires: 30, path: '/'});}
    };

    var getCurrentState = function() {
      var cookieVal =  settings.getCookie(); 
      if (cookieVal === 'open' || cookieVal === 'closed') {
        return cookieVal;
      } else if (settings.defaultStatus === 'open' || settings.defaultStatus === 'closed'){
        return settings.defaultStatus;
      } else {
        return 'open';
      }
    };

    // Decide settings - Phase I
    // User settings overrule defaults, but merge both into an empty 
    // hash so that original defaults hash isn't modified
    var settings = $.extend({}, defaults, userOptions);

    // Decide settings - Phase II. 
    // Settings that depend on another setting: the specified open direction
    // (If any of these already have values, we leave them alone)
    switch (settings.openDirection) {

        case 'up':
          // Closed
          settings.closeFunction = settings.closeFunction || functs.verticalClose;
          settings.togglerContentsClosed = settings.togglerContentsClosed || '&#x25B2'; // ▲

          // Open
          settings.openFunction = settings.openFunction || functs.verticalOpen;
          settings.togglerContentsOpen = settings.togglerContentsOpen || '&#x25BC'; // ▼
          break;

        case 'down':
          // Closed
          settings.closeFunction = settings.closeFunction || functs.verticalClose;
          settings.togglerContentsClosed = settings.togglerContentsClosed || '&#x25BC'; // ▼

          // Open
          settings.openFunction = settings.openFunction || functs.verticalOpen;
          settings.togglerContentsOpen = settings.togglerContentsOpen || '&#x25B2'; // ▲
          break;

        case 'left':
          // Closed
          settings.closeFunction = settings.closeFunction || functs.horizontalClose;
          settings.togglerContentsClosed = settings.togglerContentsClosed || '&#x25C0'; // ◀

          // Open
          settings.openFunction = settings.openFunction || functs.horizontalOpen;
          settings.togglerContentsOpen = settings.togglerContentsOpen || '&#x25B6'; // ▶
          break;

        case 'right':
          // Closed
          settings.closeFunction = settings.closeFunction || functs.horizontalClose;
          settings.togglerContentsClosed = settings.togglerContentsClosed || '&#x25B6'; // ▶

          // Open
          settings.openFunction = settings.openFunction || functs.horizontalOpen;
          settings.togglerContentsOpen = settings.togglerContentsOpen || '&#x25C0'; // ◀
          break;

        default:
          throw 'no open direction';
    }

    // Internal open and close functions - call the animation function,
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
      switch(getCurrentState()){
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
      }
    };

    // Get things started
    initialize();

    // Add click event listener
    $(settings.toggler).click(function(){
      switch(getCurrentState()) {
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
  
  var functs = {
   horizontalClose: function(speed){
      // Stash original width and display values before hiding
      $(this).data('width',$(this).width()); 
      $(this).data('display',$(this).css('display'));
      $(this).animate({width: 0, opacity: 0},speed,function(){$(this).css('display','none');});
    },

    horizontalOpen: function(speed){
      // Restore previous width and display values
      $(this).css('display',$(this).data('display'));
      $(this).animate({width: $(this).data('width'), opacity: 1},speed);
    }, 

    verticalClose: function(speed){
      $(this).slideUp(speed);
    },

    verticalOpen: function(speed){
      $(this).slideDown(speed);
    }
  };

})( jQuery );
