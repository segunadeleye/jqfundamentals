
function InputHint() {
}

InputHint.prototype.createHint = function() {
  
  var $searchInput = $('input[name=q]');

  var labelText = $('label').text();

  $searchInput.val(labelText);

  $searchInput.addClass('hint');

  $('label').remove();

  $searchInput.on('focus', function() {
    $(this).removeClass('hint').val('');
  });

  $searchInput.on('blur', function() {
    if ($.trim($(this).val() === '')) {
      $(this).addClass('hint').val(labelText);
    }
  });
}

$(document).ready(function() {
  var inputHint = new InputHint();
  inputHint.createHint();
});
