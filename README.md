Responsive-Tabs
===============  
Author: Pete Love

For creating responsive tabs. The controls behave like regular tabs above a specified screen width (defined by an editable media query in the associated css file), and behave like an accordion on screens below that width. A demo page can be seen at index.html

Demo
====
http://www.petelove.com/responsiveTabs/  

Version History
===============
1.0 Initial release  
1.1 Namespacing of function  
1.2 Improvements to efficiency and readability of code, especially around element creation and attribute setting  
1.3 More efficient selectors, some clearer variable naming  
1.4 Removed necessity for an initially active tab to be set within the markup  
1.5 Removed need for heading and panel classes to be added manually to markup  
1.6 Converted CSS to use BEM syntax and made minor css improvements  
1.7 Moved some CSS out of media queries and fixed JS issue to give (non-responsive) support for IE7 and IE8  
1.8 Fixed some issues flagged by JSHint and tweaked accordion interaction  
1.9 Made it a self executing function and made css filename more explicit  
1.10 Fixed potential scrolling issue in accordion view when more than one set of tabs on page, and other efficiency tweaks

Key features
============
- Progressive enhancement – uses semantic heading/content markup – tabs and accordion are created entirely with jQuery
- Uses Aria attributes and roles to aid screen reader accessibility
- Tabs and their content are fully accessible via keyboard
- Supports multiple sets of tabs on same page  

Notes  
=====
- In the accordion view all headings are collapsed initially. If window is resized to tab view when all accordions are collapsed then the open tab will be the last tab that was opened in tab view (or the default one if none have been opened by user)
- In accordion view if the user opens an accordion below the currently open one, then the screen will scroll down to that accordion, to prevent disorientating page jump  
- In Internet Explorer 7 and 8 the tabs are not responsive but appear as regular tabs irrespective of screen size

How to use
==========
- Include jQuery (requires minimum jquery-1.5.1.min.js)
- Include responsiveTabs.js
- Include the css from responsive-tabs.css, and adjust the media query breakpoint as desired
- Markup your tabs regions as follows:

		<div class="responsive-tabs">
			<h2>[...]</h2>
			<div>[...]</div>
			<h2>[...]</h2>
			<div>[...]</div>
		</div>

The headings can be any level, from h1 to h6. Note that the first (leftmost) tab panel will be open by default in 'tab view', while all panels will be closed in 'accordion view' (ie. below the specified breakpoint).
If you want a specific tab other than the first to be open by default then add the additional class 'responsive-tabs__panel--active' onto the panel, eg:

		<div class="responsive-tabs">
			<h2>[...]</h2>
			<div>[...]</div>
			<h2>[...]</h2>
			<div class="responsive-tabs__panel--active">[...]</div>
		</div>

- On document ready, call the function RESPONSIVEUI.responsiveTabs() to create the tabs
