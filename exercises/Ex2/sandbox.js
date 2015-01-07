
$(document).ready(function() {

// SELECTING //

// 1. Select all of the div elements that have a class of “module”.

  $moduleClass = $('div.module');

// 2. Come up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?

  $selector1 = $('#myListItem');

  $selector2 = $('li#myListItem');

  $selector3 = $('ul#myList li').eq(2);

  /**
   * $selector1 is faster because it makes use of the browser's document.getElementById method.
   *
   */ 


  
// 3. Select the label for the search input using an attribute selector

  $search = $('label[for=q]');

// 4. Figure out how many elements on the page are hidden

  $hiddenElements = $('body').find(':hidden');
  numberOfHiddenElements = $hiddenElements.length;

// 5. Figure out how many image elements on the page have an alt attribute

  $imgAlt = $('img[alt]');
  numeberOfImgAlt = $imgAlt.length;

// 6. Select all of the odd table rows in the table body.

  $oddNumeberRows = $('table tr:odd');


// TRAVERSING //

// 1. Select all of the image elements on the page; log each image’s alt attribute.

  $('img').each(function() {
    console.log($(this).attr('alt'));
  });

// 2. Select the search input text box, then traverse up to the form and add a class to the form.

  $searchInput = $('input[name=q]');
  $searchInput.parent().addClass('added-class');

// 3. Select the list item inside #myList that has a class of “current” and remove that class from it; add a class of “current” to the next list item.

  $current = $('#myList li.current');
  $nextList = $current.next()
  
  $current.removeClass('current');
  $nextList.addClass('current');

// 4. Select the select element inside #specials; traverse your way to the submit button.

  $select = $('#specials select');
  $submit = $select
              .parent()
              .next()
              .children();

// 5. Select the first list item in the #slideshow element; add the class “current” to it, and then add a class of “disabled” to its sibling elements

  $firstListItem = $('#slideshow li').first();
  $firstListItem.addClass('current')
                .siblings()
                .addClass('disabled');



// MANIPULATION //

// 1. Add five new list items to the end of the unordered list #myList.

  $myList = $('#myList');
  for (var i = 8; i <= 12; i++) {
    $newListItem = $('<li></li>').text('List item ' + i); 
    $myList.append($newListItem);
  }

// 2. Remove the odd list items

  $myList.children('li:even').remove();

// 3. Add another h2 and another paragraph to the last div.module

  $moduleClass2 = $('div.module').last();
  $moduleClass2.append('<h2>New Header</h2>');
  $moduleClass2.append('<p>New paragraph.</p>');

// 4. Add another option to the select element; give the option the value "Wednesday"

  $tuesOption = $('#specials option').eq(2);
  $newOption = $('<option value="wednesday">Wednesday</option>');
  $newOption.insertAfter($tuesOption);

// 5. Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.

  $newDivModule = $('<div></div>').addClass('module');
  $newDivModule.insertAfter($moduleClass2);

  $image = $('img:eq(1)').clone();

  $newDivModule.html($image);

});
