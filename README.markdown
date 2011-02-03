# PersistentPanel - the panel that won't quit

A simple jQuery plugin for creating panels that remember whether they are open
or closed. Allows custom animations but has sensible defaults.

 - Creates a panel that opens and closes, vertically or horizontally, when a toggler element
is clicked
 - Remembers last state a user left the panel in and use that on page reload
 - Easy to use with defaults - just $('#somediv').persistentPanel();
 - You can pass in custom animations, cookie names, etc.

## Usage Examples

(See examples/index.html)

## Options
 

<table>
  <thead>
    <tr><th>Setting Name</th><th>Default Value</th><th>Valid Values</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>changeTogglerContents</td>
      <td>true</td>
      <td>true<br/>false</td>
      <td> 
        Whether to replace the contents of your specified toggler
        element with the contents of togglerContentsOpen and
        togglerContentsClosed when it your panel is opened and closed,
        respectively. If you set this to false, the togglerContents
        settings will not be used and the toggler element's contents will
        not be modified.
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
      <td>defaultStatus</td>
      <td>'open'</td>
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
        closeFunction, togglerContentsOpen and togglerContentsClosed. If
        you provide your own values for all of those, this setting does
        nothing. (Note: opening 'up' and 'left' is currently identical to
        opening 'down' or 'right'.)
      </td>
    </tr>
    <tr>
      <td>speed</td>
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
        panel?
      </td>
    </tr>
    <tr>
      <td>togglerClassClosed</td>
      <td>'closed'</td>
      <td>Any valid CSS class name</td>
      <td>
        When your toggler is clicked and the panel closes, this class will
        be applied to the toggler. You could use it to change a background
        image, for example.
      </td>
    </tr>
    <tr>
      <td>togglerContentsClosed</td>
      <td>(unicode arrow - depends on openDirection)</td>
      <td>Any HTML</td>
      <td>
        When your toggler is clicked and the panel closes, the toggler's
        contents will be replaced with this, unless changeTogglerContents
        is false.
      </td>
    </tr>
    <tr>
      <td>togglerClassOpen</td>
      <td>'open'</td>
      <td>Any valid CSS class name</td>
      <td>
        When your toggler is clicked and the panel opens, this class will
        be applied to the toggler. You could use it to change a background
        image, for example.
      </td>
    </tr>
    <tr>
      <td>togglerContentsOpen</td>
      <td>(unicode arrow - depends on openDirection)</td>
      <td>Any HTML</td>
      <td>
        When your toggler is clicked and the panel opens, the toggler's
        contents will be replaced with this, unless changeTogglerContents
        is false.
      </td>
    </tr>
    <tr>
      <td>getCookie</td>
      <td>function(cookieName) {return $.cookie(cookieName);}</td>
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
      <td>function(cookieName, value) {$.cookie(cookieName, value, { expires: 30, path: '/'});}</td>
      <td>A function to set the cookie in the cookieName option - see
        description</td>
      <td>
        By default, this function uses the jQuery.cookie plugin. If you
        want to customize what it does - for example, set a domain for
        your cookie - refer to the jQuery.cookie plugin documentation in 
        the source code. It is quite well-written.<br/>
        For example, you could pass in the following:<br/>
        function(cookieName, value) {$.cookie(cookieName, value, { expires: 7, path: '/', domain: 'jquery.com', secure: true});}
        
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
