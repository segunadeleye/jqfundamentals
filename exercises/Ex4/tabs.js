
$(document).ready(function() {

// 1. Hide all of the modules.
  
  var $modules = $('.module')
  $modules.hide();

// 2. Create an unordered list element before the first module.

  var $list = $('<ul></ul>');
  $list.insertBefore($modules.first());

// 3. Iterate over the modules using $.fn.each. For each module, use the text of the h2 element as the text for a list item that you add to the unordered list element.

  $modules.each(function() {
    var h2Text = $(this).children('h2').text();
    var $listItem = $('<li>' + h2Text + '</li>');

    $listItem.appendTo($list);
  });

// 4. Bind a click event to the list item that:

    // a. Shows the related module, and hides any other modules

    // b. Adds a class of "current" to the clicked list item

    // c. Removes the class "current" from the other list item
    
      $listItem = $list.children();
      $listItem.on('click', function() {
        var listItemIndex = $(this).index();

        $(this).addClass('current')
                .siblings('li')
                .removeClass('current');

        $modules.eq(listItemIndex)
                .show()
                .siblings('.module')
                .hide();
      });

// 5. Finally, show the first tab.

    $modules.eq(0).show();

});