Responsive-Tabs
===============  
Author: Pete Love

For creating responsive tabs. The controls behave like regular tabs above a specified screen width (defined by an editable media query in the associated css file), and behave like an accordion on screens below that width. A demo page can be seen at index.html

Version History
===============
1.0 Initial release  
1.1 Namespacing of function  
1.2 Improvements to efficiency and readability of code, especially around element creation and attribute setting

Key features
============
- Progressive enhancement – uses semantic heading/content markup – tabs and accordion are created entirely with jQuery
- Uses Aria attributes and roles to aid screen reader accessibility
- Tabs and their content are fully accessible via keyboard
- Supports multiple sets of tabs on same page  

Notes  
=====
- When tabs are generated, the tab that is open initially is set by the author in the markup (future versions are planned to default to the first tab if none is sepcified).  
- In the accordion view all headings are collapsed initially. If window is resized to tab view when all accordions are collapsed then the open tab will be the last tab that was opened in tab view (or the default one if none have been opened by user)
- In accordion view if the user opens an accordion below the currently open one, then the screen will scroll down to that accordion, to prevent disorientating page jump

How to use
==========
- Include jQuery (requires minimum jquery-1.5.1.min.js)
- Include responsiveTabs.js
- Include the css from tabs.css, and adjust the media query breakpoint as desired
- Markup your tabs regions as follows:

		<div class="tabs">
			<h2 class="tab-heading active-tab-heading">[...]</h2>
			<div class="tab-panel active-panel">[...]</div>
			<h2 class="tab-heading">[...]</h2>
			<div class="tab-panel">[...]</div>
		</div>

(The headings can be any level, as long as they have the class ‘tab-heading’. Just wrap the content of each tab in a &lt;div> with class ‘tab-panel’. Note that the tab you want open on page load requires the additional class ‘active-tab-heading’ on the heading, and ‘active-panel’ on the content &lt;div> ).

- On document ready, call the function RESPONSIVEUI.responsiveTabs() …your tabs will appear!
