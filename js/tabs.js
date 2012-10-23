$(document).ready(function() {
	responsiveTabs(768);
})

function responsiveTabs(breakpoint) {
	$('.tabs').addClass('enabled');

	$('.tab').not('.active-tab').hide();
	
	$('.tabs').each(function() {
		var $tabs = $(this);

		var $tabList = $('<ul/>');
		$tabList.addClass('tab-list');

		$tabs.find('.tab').each(function() {

			var $this = $(this);

			//create tab list

			var $tabListItem = $('<li/>');
			$tabListItem.text($this.prev().text());
			$tabListItem.click(function() {
				$this.closest('.tabs').find('.active-tab').toggle().removeClass('active-tab').prev().removeClass('active-header');
				$this.toggle().addClass('active-tab');
				$this.prev().addClass('active-header');
			})
			$tabList.append($tabListItem);

			//toggle tab if click heading
			$this.prev().click(function() {
				if (($(window).width() <= breakpoint) && (!$this.hasClass('active-tab')) ){
					//if (!$this.hasClass('active-tab')) 
						$this.closest('.tabs').find('.active-tab').slideToggle().removeClass('active-tab').prev().removeClass('active-header');
						$this.slideToggle().addClass('active-tab');
						$this.prev().addClass('active-header');
					
				}

			})
		})

		$tabs.prepend($tabList);
	})
	
	
}