function Tabs() {
}

Tabs.prototype.showContent = function() {
  var $modules = $('.module');
  $modules.hide();

  var $list = $('<ul />');
  $list.insertBefore($modules.first());

  $modules.each(function() {
    var h2Text = $(this).children('h2').text();
    var $listItem = $('<li />').text(h2Text);

    $listItem
      .css('cursor', 'pointer')
      .appendTo($list);
  });
      
  $listItem = $list.children();
  $listItem.on('click', function() {
    var listItemIndex = $(this).index();

    $(this)
      .addClass('current')
      .siblings('li')
      .removeClass('current');

    $modules
      .eq(listItemIndex)
      .show()
      .siblings('.module')
      .hide();
  });

  $listItem
    .eq(0)
    .addClass('current');

  $modules
    .eq(0)
    .show();
}
  
$(document).ready(function() {
  var tabs = new Tabs();
  tabs.showContent();
});
