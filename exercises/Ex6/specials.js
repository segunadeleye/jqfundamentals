
function Specials() {
}

Specials.prototype.getSpecial = function() {

  var that = this;
  
  var $specials = $('#specials');
  $div = $('<div />');

  $specials
    .append($div)
    .find('li.buttons')
    .remove();

  $specials
    .find('select')
    .change(function() {
        
      $option = $(this);
        
      $.getJSON('specials.json', function(data) {
        var day = $option.val();
        that.displaySpecial(data, day);
      });
    });
}

Specials.prototype.displaySpecial = function(response, value) {

  if (value) {
    
    $div.empty();

    var $title = $('<h2 />');
    var $text = $('<p />');
    var $image = $('<img />');

    $div.append($title, $text, $image);

    var special = response[value];
    
    $title
      .css('color', special.color)
      .html(special.title);

    $text.html(special.text);
    $image.attr('src', special.image);

  } else {
    $div.empty();
  }
};

$(document).ready(function() {

  var specials = new Specials();
  specials.getSpecial();

});
