/* ----------------
ResponsiveTabs.js
Author: Pete Love | www.petelove.com
Version: 1.11
------------------- */

var RESPONSIVEUI = {};

(function($) {

	RESPONSIVEUI.responsiveTabs = function (options) {

		var defaults = {
			targetClass: 'responsive-tabs', // Base class to look for, also determines all element & state classes (__heading, etc)
			defaultSpeed: 0, // Default speed of the tab toggle. Set to 0 for instant switch
			responsiveSpeed: 150, // Default speed of the responsive accordion slideToggle. Set to 0 for instant switch
			scrollOffset: 0,
			onTabShow: function(){},// Callback function when a tab is shown
			onTabHide: function(){} // Callback function when a tab is hidden
		};
		
		var settings = $.extend({}, defaults, options);
		
		var $tabSets = $("."+settings.targetClass);

		if (!$tabSets.hasClass(settings.targetClass+'--enabled')) {	// if we haven't already called this function and enabled tabs
			$tabSets.addClass(settings.targetClass+'--enabled');

			//loop through all sets of tabs on the page
			var tablistcount = 1;

			$tabSets.each(function() {

				var $tabs = $(this);

				// add tab heading and tab panel classes
				$tabs.children(':header').addClass(settings.targetClass+'__heading');
				$tabs.children('div').addClass(settings.targetClass+'__panel');

				// determine if markup already identifies the active tab panel for this set of tabs
				// if not then set first heading and tab to be the active one
				var $activePanel = $tabs.find('.'+settings.targetClass+'__panel--active');
				if(!$activePanel.length) {
					$activePanel = $tabs.find('.'+settings.targetClass+'__panel').first().addClass(settings.targetClass+'__panel--active');
				}

				$tabs.find('.'+settings.targetClass+'__panel').not('.'+settings.targetClass+'__panel--active').hide().attr('aria-hidden','true'); //hide all except active panel
				$activePanel.attr('aria-hidden', 'false');
				/* make active tab panel hidden for mobile */
				$activePanel.addClass(settings.targetClass+'__panel--closed-accordion-only');

				// wrap tabs in container - to be dynamically resized to help prevent page jump
				var $tabsWrapper = $('<div/>', {'class': settings.targetClass+'-wrapper' });
				$tabs.wrap($tabsWrapper);

				var highestHeight = 0;

				// determine height of tallest tab panel. Used later to prevent page jump when tabs are clicked
				$tabs.find('.'+settings.targetClass+'__panel').each(function() {
					var tabHeight = $(this).height();
					if (tabHeight > highestHeight) {
						highestHeight = tabHeight;
					}
				});

				//create the tab list
				var $tabList = $('<ul/>', { 'class': settings.targetClass+'__list', 'role': 'tablist' });

				//loop through each heading in set
				var tabcount = 1;
				$tabs.find('.'+settings.targetClass+'__heading').each(function() {

					var $tabHeading = $(this);
					var $tabPanel = $(this).next();

					$tabHeading.attr('tabindex', 0);

					// CREATE TAB ITEMS (VISIBLE ON DESKTOP)
					//create tab list item from heading
					//associate tab list item with tab panel
					var $tabListItem = $('<li/>', {
						'class': settings.targetClass+'__list__item',
						id: 'tablist' + tablistcount + '-tab' + tabcount,
						'aria-controls': 'tablist' + tablistcount +'-panel' + tabcount,
						'role': 'tab',
						tabindex: 0,
						text: $tabHeading.text(),
						keydown: function (objEvent) {
							if (objEvent.keyCode === 13) { // if user presses 'enter'
								$tabListItem.click();
							}
						},
						click: function() {
							//Show associated panel

							//set height of tab container to highest panel height to avoid page jump
							$tabsWrapper.css('height', highestHeight);

							// remove hidden mobile class from any other panel as we'll want that panel to be open at mobile size
							$tabs.find('.'+settings.targetClass+'__panel--closed-accordion-only').removeClass(settings.targetClass+'__panel--closed-accordion-only');
							
							// close current panel and remove active state from its (hidden on desktop) heading
							$tabs.find('.'+settings.targetClass+'__panel--active').toggle(settings.defaultSpeed,function(){
								settings.onTabHide.call(this);
							}).removeClass(settings.targetClass+'__panel--active').attr('aria-hidden','true').prev().removeClass(settings.targetClass+'__heading--active');
							
							//make this tab panel active
							$tabPanel.toggle(settings.defaultSpeed,function(){
								settings.onTabShow.call(this);
							}).addClass(settings.targetClass+'__panel--active').attr('aria-hidden','false');

							//make the hidden heading active
							$tabHeading.addClass(settings.targetClass+'__heading--active');

							//remove active state from currently active tab list item
							$tabList.find('.'+settings.targetClass+'__list__item--active').removeClass(settings.targetClass+'__list__item--active');

							//make this tab active
							$tabListItem.addClass(settings.targetClass+'__list__item--active');

							//reset height of tab panels to auto
							$tabsWrapper.css('height', 'auto');
						}
					});
					
					//associate tab panel with tab list item
					$tabPanel.attr({
						'role': 'tabpanel',
						'aria-labelledby': $tabListItem.attr('id'),
						id: 'tablist' + tablistcount + '-panel' + tabcount
					});

					// if this is the active panel then make it the active tab item
					if($tabPanel.hasClass(settings.targetClass+'__panel--active')) {
						$tabListItem.addClass(settings.targetClass+'__list__item--active');
					}

					// add tab item
					$tabList.append($tabListItem);

					
					// TAB HEADINGS (VISIBLE ON MOBILE)
					// if user presses 'enter' on tab heading trigger the click event
					$tabHeading.keydown(function(objEvent) {
						if (objEvent.keyCode === 13) {
							$tabHeading.click();
						}
					});

					//toggle tab panel if click heading (on mobile)
					$tabHeading.click(function() {

						// remove any hidden mobile class
						$tabs.find('.'+settings.targetClass+'__panel--closed-accordion-only').removeClass(settings.targetClass+'__panel--closed-accordion-only');

						// if this isn't currently active
						if (!$tabHeading.hasClass(settings.targetClass+'__heading--active')){

							var oldActivePos,
								$activeHeading = $tabs.find('.'+settings.targetClass+'__heading--active');
								
							// if there is an active heading, get its position
							if($activeHeading.length) {
								oldActivePos = $activeHeading.offset().top;
							}
							
							// close currently active panel and remove active state from any hidden heading
							$tabs.find('.'+settings.targetClass+'__panel--active').slideToggle(settings.responsiveSpeed,function(){
								settings.onTabHide.call(this);
							}).removeClass(settings.targetClass+'__panel--active').prev().removeClass(settings.targetClass+'__heading--active');
							
							//close all tabs
							$tabs.find('.'+settings.targetClass+'__panel').hide().attr('aria-hidden','true');

							//open this panel
							$tabPanel.slideToggle(settings.responsiveSpeed,function(){
								settings.onTabShow.call(this);
							}).addClass(settings.targetClass+'__panel--active').attr('aria-hidden','false');

							// make this heading active
							$tabHeading.addClass(settings.targetClass+'__heading--active');

							var $currentActive = $tabs.find('.'+settings.targetClass+'__list__item--active');

							//set the active tab list item (for desktop)
							$currentActive.removeClass(settings.targetClass+'__list__item--active');
							var panelId = $tabPanel.attr('id');
							var tabId = panelId.replace('panel','tab');
							$('#' + tabId).addClass(settings.targetClass+'__list__item--active');

							//scroll to active heading only if it is below previous one
							var tabsPos = $tabs.offset().top - settings.scrollOffset;
							var newActivePos = ($tabHeading.offset().top) - 15 - settings.scrollOffset;
							if(oldActivePos < newActivePos) {
								$('html, body').animate({ scrollTop: tabsPos }, 0).animate({ scrollTop: newActivePos }, 400);
							}
							
						}

						// if this tab panel is already active
						else {

							// hide panel but give it special responsive-tabs__panel--closed-accordion-only class so that it can be visible at desktop size
							$tabPanel.removeClass(settings.targetClass+'__panel--active').slideToggle(settings.responsiveSpeed,function () {
								$(this).addClass(settings.targetClass+'__panel--closed-accordion-only');
								settings.onTabHide.call(this);
							});

							//remove active heading class
							$tabHeading.removeClass(settings.targetClass+'__heading--active');

							//don't alter classes on tabs as we want it active if put back to desktop size
						}
						
					});

					tabcount ++;

				});

				// add finished tab list to its container
				$tabs.prepend($tabList);

				// next set of tabs on page
				tablistcount ++;
			});
		}
	};
})(jQuery);
