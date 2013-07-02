Responsive-Tabs
===============  
Original Author: Pete Love (@petelove666)

For creating responsive tabs. The controls behave like regular tabs above a specified screen width (defined by an editable media query in the associated css file), and behave like an accordion on screens below that width. A demo page can be seen at index.html

Version History
===============
- 1.0 Initial release  
- 1.1 Namespacing of function  
- 1.2 Improvements to efficiency and readability of code, especially around element creation and attribute setting  
- 1.3 More efficient selectors, some clearer variable naming  
- 1.4 Removed necessity for an initially active tab to be set within the markup  
- 1.5 Removed need for heading and panel classes to be added manually to markup  
- 1.6 Converted CSS to use BEM syntax and made minor css improvements  
- 1.7 Moved some CSS out of media queries and fixed JS issue to give (non-responsive) support for IE7 and IE8  
- 1.8 Fixed some issues flagged by JSHint and tweaked accordion interaction  
- 1.9 Made it a self executing function and made css filename more explicit  
- 1.10 Fixed potential scrolling issue in accordion view when more than one set of tabs on page, and other efficiency tweaks
- 1.11 Added options & callbacks (@shshaw)
- 1.12 Added Scroll Offset option (@shshaw)
- 1.13 Made plugin jQuery chain-able (@shshaw)

Key features
============
- Progressive enhancement – uses semantic heading/content markup – tabs and accordion are created entirely with jQuery
- Uses Aria attributes and roles to aid screen reader accessibility
- Tabs and their content are fully accessible via keyboard
- Supports multiple sets of tabs on same page
- jQuery chain-able
- Callbacks for tab show/hide
- Customizable options to help fit your needs
 
 
Notes  
=====
- In the accordion view all headings are collapsed initially. If window is resized to tab view when all accordions are collapsed then the open tab will be the last tab that was opened in tab view (or the default one if none have been opened by user)
- In accordion view if the user opens an accordion below the currently open one, then the screen will scroll down to that accordion, to prevent disorientating page jump  
- In Internet Explorer 7 and 8 the tabs are not responsive but appear as regular tabs irrespective of screen size

How to use
==========
1. Include jQuery (requires minimum jquery-1.5.1.min.js)
2. Include responsiveTabs.js
3. Include the css from responsive-tabs.css, and adjust the media query breakpoint as desired
4. Markup your tabs regions as follows:

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

5. On document ready, call the function `$('.responsive-tabs').responsiveTabs()` to create the tabs. Include any options you need:

		$(document).ready(function() {
			$('.responsive-tabs').responsiveTabs({
				targetClass: 'responsive-tabs', // Base class to look for, also determines all element & state classes (__heading, etc). Keep this as 'responsive-tabs' if you use the included CSS.
				defaultSpeed: 0, // Default speed of the tab toggle. Set to 0 for instant switch
				responsiveSpeed: 150, // Default speed of the responsive accordion slideToggle. Set to 0 for instant switch
				scrollOffset: 0, // Specify an offset from the top when scrolling to active tab to compensate for fixed headers and other design elements
				onTabShow: function(){ // Callback function when a tab is shown
					console.log("Tab Shown "+$(this).attr("class")); 
				}, 
				onTabHide: function(){ // Callback function when a tab is hidden
					console.log("Tab Hidden "+$(this).attr("class"));
				}
			});
		});
