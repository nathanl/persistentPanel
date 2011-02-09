# PersistentPanel - the panel that won't quit

A simple jQuery plugin for creating panels that remember whether they are open
or closed. Allows custom animations but has sensible defaults.

 - Creates a panel that opens and closes, vertically or horizontally, when a toggler element
is clicked
 - Remembers last state a user left the panel in and use that on page reload
 - Easy to use with defaults - just $('#somediv').persistentPanel();
 - You can pass in custom animations, cookie names, etc.

## Warning

Despite wanting to use [semantic versioning](http://www.semver.org), I jumped
the gun on going to 1.0, which should mean "ready for the public to use and
will have no backwards-incompatible changes in the API until version 2.0." I
thought I was at this point, but I continue to find things I want to tweak in
the API. Since I don't want to move rapidly through 2.0, 3.0, etc, I'm just
warning you here that **this will be unstable until 2.0**.

At that point, I plan to begin using semantic versioning properly, with patch,
minor and major version changes following the numeric scheme linked above.

My apologies for any confusion.

## Usage Examples

(See examples/index.html)

## Options (as of v1.20)

<table>
  <thead>
    <tr><th>Setting Name</th><th>Default Value</th><th>Valid Values</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>closeFunction</td>
      <td>(depends on openDirection)</td>
      <td>Any jquery animation for hiding</td>
      <td>
       If you don't specify this, a default will be chosen based on the
       openDirection (which also has its own default). If you do specify a
       closeFunction, it should accept a duration parameter. This is for two
       reasons:
       <ul>
         <li>Your duration setting will be passed to this function</li>
         <li>On page load, if the panel should be closed, this function will be
         called with a duration of 0 (meaning "close instantly").</li>
       </ul> 
      </td>
    </tr>
    <tr>
      <td>cookieName</td>
      <td>'persistentPanel'</td>
      <td>Any string</td>
      <td>
        The name of the cookie to set and check for this panel. If two
        panels use the same cookie name (and if neither of them has this
        options specified, they will both use the default), toggling one
        of them will affect whether the other is open or closed on page
        load. If you have a single panel that you display on multiple
        pages, it should use the same cookie name on each page.
      </td>
    </tr>
    <tr>
      <td>defaultState</td>
      <td>'closed'</td>
      <td>'open' <br/> 'closed'</td>
      <td>
        If no cookie is set, should the panel start out open or
        closed?
      </td>
    </tr>
    <tr>
      <td>openDirection</td>
      <td>'down'</td>
      <td>'up' <br/> 'down' <br/> 'left' <br/> 'right'</td>
      <td>
        Is used to determine default values for openFunction,
        closeFunction, togglerContents.open and togglerContents.closed. If
        you provide your own values for all of those, this setting does
        nothing. (Note: opening 'up' and 'left' is currently identical to
        opening 'down' or 'right'.)
      </td>
    </tr>
    <tr>
      <td>openFunction</td>
      <td>(depends on openDirection)</td>
      <td>Any jquery animation for showing</td>
      <td>
       If you don't specify this, a default will be chosen based on the
       openDirection (which also has its own default). If you do specify an
       openFunction, it should accept a duration parameter. This is for two
       reasons:
       <ul>
         <li>Your duration setting will be passed to this function</li>
         <li>On page load, if the panel should be open, this function will be
         called with a duration of 0 (meaning "open instantly").</li>
       </ul> 
      </td>
    </tr>
    <tr>
      <td>duration</td>
      <td>500</td>
      <td>Any number accepted by jQuery's animate functions</td>
      <td>
        Duration (in milliseconds) that your openFunction and
        closeFunction should take to run.
      </td>
    </tr>
    <tr>
      <td>toggler</td>
      <td>'#panelToggler'</td>
      <td>Any valid jQuery selector string</td>
      <td>
        Which element, when clicked, should open and close your
        panel? Note: I **strongly** recommend that you use an ID for this
        selector; you may have more than one panel on the screen at some
        point, and you don't want multiple togglers to affect the same panel.
        (If you're using the same ID more than once per page, you're Doing 
        It Wrong.)
      </td>
    </tr>
    <tr>
      <td>togglerClass</td>
      <td>{open: 'open', closed: 'closed'}</td>
      <td>false <br/> Object with properties 'open' and/or 'closed' - values can be any valid CSS class name</td>
      <td>
        When your toggler is clicked and the panel opens or closes, the
        class specified here will be applied to the toggler. If you only 
        specify one of the classes, the other will use the default. 
        These classes could be used to change a background image, for 
        example, instead of changing the togglerContents.
        If this option is set to false, the toggler's class will not be
        changed.
      </td>
    </tr>
    <tr>
      <td>togglerContents</td>
      <td>(unicode arrows - depends on openDirection)</td>
      <td>false <br/> {open: 'someHTML'} <br/> {closed: 'someHTML'} <br/> {open: 'someHTML', closed: 'someHTML'}</td>
      <td>
        If set to false, the contents of your toggler element will not be
        modified when your toggler is opened and closed (on page load,
        the toggler is immediately either opened or closed.)
        If set to an object containing the keys 'open', 'closed' or both,
        the contents of the toggler will be replaced with the value of the
        corresponding key when the toggler is opened or closed. If one option
        is not specified, it will be filled in from the defaults, based on the
        openDirection.<br/>
        For example, if your openDirection is 'down', and you pass in 
        togglerContents: {closed: 'open me!'}, then when your panel is closed,
        the toggler will contain 'open me!', and when your panel is open,
        it will contain the default up arrow.
      </td>
    </tr>
    <tr>
      <td>getCookie</td>
      <td><code>function(cookieName) {return $.cookie(cookieName);}</code></td>
      <td>A function to get the cookie from the cookieName option - see description</td>
      <td>
        By default, this function uses the jQuery.cookie plugin. If you
        don't want this dependency, pass in your own function. It should:
        <ul>
          <li>Accept cookieName as a parameter, so that the panel can
          request the correct cookie for itself</li>
          <li>Return the string value of the cookie</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>setCookie</td>
      <td><code>function(cookieName, value) {$.cookie(cookieName, value, { expires: 30, path: '/'});}</code></td>
      <td>A function to set the cookie in the cookieName option - see
        description</td>
      <td>
        By default, this function uses the jQuery.cookie plugin. If you
        want to customize what it does - for example, set a domain for
        your cookie - refer to the jQuery.cookie plugin documentation in 
        the source code. It is quite well-written.<br/>
        For example, you could pass in the following:<br/>
        <code>function(cookieName, value) {$.cookie(cookieName, value, { expires: 7, path: '/', domain: 'jquery.com', secure: true});}</code>
        
        <br/>
        If you don't want the dependency on jQuery.cookie, pass in your own function. It should:
        <ul>
          <li>
          Accept cookieName as the first parameter, so that the panel can set the correct cookie for itself
          </li>
          <li>
          Accept value as the second parameter, so that the panel can
          indicate whether it should be set to 'open' or 'closed'
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## nonPersistentPanel() - Everything except persistence

If you want to use the other functionality of persistentPanel - the
animation, the toggler contents, etc - but do NOT want your panel to remember
its state when the page is reloaded, it's easy: call
$('#someElement').nonPersistentPanel();
