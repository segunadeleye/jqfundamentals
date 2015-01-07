
$(document).ready(function() {

// 1. Set the value of the search input to the text of the label element

  $searchInput = $('input[name=q]');

  labelText = $('label').text();

  $searchInput.val(labelText);



// 2. Add a class of "hint" to the search input

  $searchInput.addClass('hint');


// 3. Remove the label element

  $('label').remove();


// 4. Bind a focus event to the search input that removes the hint text and the "hint" class

  $searchInput.on('focus', function() {
    $(this).removeClass('hint').val('');
  });


// 5. Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered

  $searchInput.on('blur', function() {
    if ($.trim($(this).val() === '')) {
      $(this).addClass('hint').val(labelText);
    };
  });

});
