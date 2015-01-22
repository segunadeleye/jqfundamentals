
function SandBox() {
}

SandBox.prototype.selecting = function() {
  
  // SELECTING //

  // 1. Select all of the div elements that have a class of “module”.

    $moduleClass = $('div.module');

  // 2. Come up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?

    $selector1 = $('#myListItem');

    $selector2 = $('li#myListItem');

    $selector3 = $('#myList li').eq(2);

    /**
     * $selector1 is faster because it makes use of the browser's document.getElementById method.
     *
     */

    
  // 3. Select the label for the search input using an attribute selector

    $search = $('label[for=q]');

  // 4. Figure out how many elements on the page are hidden

    numberOfHiddenElements = $(':hidden').length;

  // 5. Figure out how many image elements on the page have an alt attribute

    numeberOfImgWithAlt = $('img[alt]').length;

  // 6. Select all of the odd table rows in the table body.

    $oddNumeberRows = $('table tr:odd');
}

SandBox.prototype.traversing = function() {

  // TRAVERSING //

  // 1. Select all of the image elements on the page; log each image’s alt attribute.

    $('img').each(function() {
      console.log($(this).attr('alt'));
    });

  // 2. Select the search input text box, then traverse up to the form and add a class to the form.

    $searchInput = $('input[name=q]');
    $searchInput
      .parent('#search')
      .addClass('added-class');

  // 3. Select the list item inside #myList that has a class of “current” and remove that class from it; add a class of “current” to the next list item.

    $('#myList li.current')
      .removeClass('current')
      .next()
      .addClass('current');

  // 4. Select the select element inside #specials; traverse your way to the submit button.

    $('#specials select')
      .parent()
      .next()
      .children();

  // 5. Select the first list item in the #slideshow element; add the class “current” to it, and then add a class of “disabled” to its sibling elements

    $('#slideshow li:first')
      .addClass('current')
      .siblings()
      .addClass('disabled');
}


SandBox.prototype.manipulating = function() {

  // MANIPULATING //

  // 1. Add five new list items to the end of the unordered list #myList.

    for (var i = 8; i <= 12; i++) {
      $('#myList').append($('<li />').text('List item ' + i));
    }

  // 2. Remove the odd list items

    $('#myList').children('li:even').remove();

  // 3. Add another h2 and another paragraph to the last div.module

    $moduleClass2 = $('div.module:last');
    $moduleClass2.append($('<h2 />').text('New Header'));
    $moduleClass2.append($('<p />').text('New paragraph'));

  // 4. Add another option to the select element; give the option the value "Wednesday"

    $newOption = $('<option />')
                    .attr('value', 'wednesday')
                    .text('Wednesday');
    $('select').append($newOption);

  // 5. Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.

    $image = $('img:eq(1)').clone();

    $('<div />')
      .addClass('module')
      .html($image)
      .insertAfter($moduleClass2);
}

$(document).ready(function() {

  var sandbox = new SandBox();
  sandbox.selecting();
  sandbox.traversing();
  sandbox.manipulating();

});
