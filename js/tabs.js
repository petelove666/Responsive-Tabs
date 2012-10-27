// chnage tab class when headings sre clicked
// aria roles
//tabindex and aria selected aren't modified by click event

$(document).ready(function() {
	responsiveTabs();
})

function responsiveTabs(breakpoint) {
	
	$('.tabs').addClass('enabled').attr('role','application');
	$('.tab-panel').not('.active-panel').hide().attr('aria-hidden','true');
	$('.tab-panel.active-panel').attr('aria-hidden','false');
	
	var tablistcount = 1;

	$('.tabs').each(function() {

		var $tabs = $(this);

		var $tabList = $('<ul/>');
		$tabList.addClass('tab-list');
		$tabList.attr('role','tablist');

		var tabcount = 1;

		$tabs.find('.tab-heading').each(function() {

			var $this = $(this);

			//create tab list

			var $tabListItem = $('<li/>');
			$tabListItem.addClass('tab');
			$tabListItem.attr('id', 'tablist' + tablistcount + '-tab' + tabcount);
			$tabListItem.attr('aria-controls', 'tablist' + tablistcount +'-panel' + tabcount);
			//$tabListItem.attr('tabindex', '-1');
			//$tabListItem.attr('aria-selected', 'false');
			
			if($this.hasClass('active-tab-heading')) {
				$tabListItem.addClass('active-tab');
				//$tabListItem.attr('tabindex', '0');
				//$tabListItem.attr('aria-selected', 'true');
			}

			$tabListItem.attr('role','tab');
			$tabListItem.text($this.text());


			$this.next().attr('role','tabpanel').attr('aria-labelledby', $tabListItem.attr('id')).attr('id', 'tablist' + tablistcount + '-panel' + tabcount);



			//toggle tab panel if click tab
			$tabListItem.click(function() {

				// remove hidden mobile class from any other tab as we'll want this tab content to be open at mobile size
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
			})

			$tabList.append($tabListItem);

			//toggle tab panel if click heading
			$this.click(function() {

				// remove any hidden mobile class
				$this.closest('.tabs').find('.hidden-mobile').removeClass('hidden-mobile');

				// if this isn't currently active
				if (!$this.hasClass('active-tab-heading')){

					// close currently active panel and remove active state from any hidden heading
					$this.closest('.tabs').find('.active-panel').slideToggle().removeClass('active-panel').prev().removeClass('active-tab-heading');
					
					//close all tabs
					$this.closest('.tabs').find('.tab-panel').hide().attr('aria-hidden','true');

					//open this panel
					$this.next().slideToggle().addClass('active-panel').attr('aria-hidden','false');

					// make this heading active
					$this.addClass('active-tab-heading');

					// make current active tab inactive, make relevant tab active
					$this.closest('.tabs').find('.active-tab').removeClass('active-tab');
					var panelId = $this.next().attr('id');
					var tabId = panelId.replace('panel','tab');
					$('#' + tabId).addClass('active-tab');
				}

				// if this is already active
				else {
					// hide panel but give it special hidden-mobile class so that it can be visible at desktop size
					$this.next().removeClass('active-panel').slideToggle().addClass('hidden-mobile');

					//remove active heading class
					$this.removeClass('active-tab-heading');

					//don't alter classes on tabs
				}
				
			})

			tabcount ++;
		})

		$tabs.prepend($tabList);

		tablistcount ++;
	})
	
	
}