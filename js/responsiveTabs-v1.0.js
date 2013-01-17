/* ----------------

ResponsiveTabs.js
Author: Pete Love
Version: 1.0
------------------- */


function responsiveTabs() {
	if (!$('.tabs').hasClass('enabled')) {	// if we haven't already enabled tabs
		$('.tabs').addClass('enabled'); // used to style tabs if JS is loaded
		$('.tab-panel').not('.active-panel').hide().attr('aria-hidden','true'); //hide all except active panel
		$('.tab-panel.active-panel').attr('aria-hidden', 'false');
		/* make active tab hidden for mobile */
		$('.tab-panel.active-panel').addClass('hidden-mobile');
		
		var tablistcount = 1;

		//loop through all sets of tabs on the page
		$('.tabs').each(function() {

			var $tabs = $(this);

			// wrap tabs in container to - to be dynamically resized to help prevent page jump
	    	var $tabsPanel = $('<div />').addClass('tabs-panel').insertBefore($tabs);
	    	$tabs.prependTo($tabsPanel);

			var highestHeight = 0;

			// determine height of tallest tab panel. Used later to prevent page jump when tabs are clicked
			$tabs.find('.tab-panel').each(function() {
				var tabHeight = $(this).height();
				if (tabHeight > highestHeight) {
					highestHeight = tabHeight;
				}
			})

			//create the tab list
			var $tabList = $('<ul/>');
			$tabList.addClass('tab-list');
			$tabList.attr('role','tablist');

			var tabcount = 1;

			//loop through each heading in set
			$tabs.find('.tab-heading').each(function() {

				var $this = $(this);
				$this.attr('tabindex', 0);

				//create tab list items from headings
				var $tabListItem = $('<li/>');
				$tabListItem.addClass('tab');

				//associate tab list item with tab panel
				$tabListItem.attr('id', 'tablist' + tablistcount + '-tab' + tabcount);
				$tabListItem.attr('aria-controls', 'tablist' + tablistcount +'-panel' + tabcount);
				$tabListItem.attr('tabindex', 0);
				
				// if this is the active heading then make it the active tab panel
				if($this.hasClass('active-tab-heading')) {
					$tabListItem.addClass('active-tab');
					/* make active heading inactive for mobile */
	                $this.removeClass('active-tab-heading');
				}

				//assign tab with role and text
				$tabListItem.attr('role','tab');
				$tabListItem.text($this.text());

				//associate tab panel with tabl list item
				$this.next().attr('role','tabpanel').attr('aria-labelledby', $tabListItem.attr('id')).attr('id', 'tablist' + tablistcount + '-panel' + tabcount);
	 
	 			// if user presses 'enter' on tab list item trigger the click event
				$tabListItem.keydown(function(objEvent) {
		            if (objEvent.keyCode == 13) {
		                 $tabListItem.click();
		            }
		        })


				//toggle tab panel if click event fired on tab list item
				$tabListItem.click(function() {

					//set height of tab container to highest panel height to avoid page jump
					$tabsPanel.css('height', highestHeight);

					// remove hidden mobile class from any other tab as we'll want that tab content to be open at mobile size
					$this.closest('.tabs').find('.hidden-mobile').removeClass('hidden-mobile');
					
					// close current panel and remove active state from any hidden headings
					$this.closest('.tabs').find('.active-panel').toggle().removeClass('active-panel').attr('aria-hidden','true').prev().removeClass('active-tab-heading');
					
					//make this tab content active
					$this.next().toggle().addClass('active-panel').attr('aria-hidden','false');

					//make the hidden heading active
					$this.addClass('active-tab-heading');

					//remove active state from currently active tab
					$tabListItem.closest('.tab-list').find('.active-tab').removeClass('active-tab');

					//make this tab active
					$tabListItem.addClass('active-tab');

					//reset height of tab panels to auto
					$tabsPanel.css('height', 'auto');


				})

				$tabList.append($tabListItem);

				// if user presses 'enter' on tab heading trigger the click event
				$this.keydown(function(objEvent) {
		            if (objEvent.keyCode == 13) {
		                 $this.click();
		            }
		        })

				//toggle tab panel if click heading (ie. mobile)
				$this.click(function() {

					// remove any hidden mobile class
					$this.closest('.tabs').find('.hidden-mobile').removeClass('hidden-mobile');

					// if this isn't currently active
					if (!$this.hasClass('active-tab-heading')){
						//get position of active heading 
						if($('.active-tab-heading').length) {
							var oldActivePos = $('.active-tab-heading').offset().top;
						}
						
						// close currently active panel and remove active state from any hidden heading
						$this.closest('.tabs').find('.active-panel').slideToggle().removeClass('active-panel').prev().removeClass('active-tab-heading');
						
						//close all tabs
						$this.closest('.tabs').find('.tab-panel').hide().attr('aria-hidden','true');

						//open this panel
						$this.next().slideToggle().addClass('active-panel').attr('aria-hidden','false');

						// make this heading active
						$this.addClass('active-tab-heading');

						var $currentActive = $this.closest('.tabs').find('.active-tab');

						//set the active tab (for desktop)
						$currentActive.removeClass('active-tab');
						var panelId = $this.next().attr('id');
						var tabId = panelId.replace('panel','tab');
						$('#' + tabId).addClass('active-tab');

						//scroll to active heading only if it is below previous one
						var tabsPos = $('.tabs').offset().top;
						var newActivePos = $('.active-tab-heading').offset().top;
						if(oldActivePos < newActivePos) {
							$('html, body').animate({ scrollTop: tabsPos }, 0).animate({ scrollTop: newActivePos }, 400);
						}
						
					}

					// if this tab panel is already active
					else {

						// hide panel but give it special hidden-mobile class so that it can be visible at desktop size
						$this.next().removeClass('active-panel').slideToggle(function () { $(this).addClass('hidden-mobile') });

						//remove active heading class
						$this.removeClass('active-tab-heading');

						//don't alter classes on tabs as we want it active if put back to desktop size
					}
					
				})

				tabcount ++;
			})

			// add tabs to tab list
			$tabs.prepend($tabList);

			tablistcount ++;
		})
	}
}