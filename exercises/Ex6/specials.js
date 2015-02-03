function Specials() {
}

Specials.prototype.init = function() {
  that = this;
  this.getList(this.filter);
}

Specials.prototype.getList = function(callback) {
  $.ajax({
    url: 'specials.json',
    dataType: 'json',
    success: function(result) {
      callback(result);
    },
    cache: false
  });
}

Specials.prototype.filter = function(list) {
  var $specials = $('#specials');
  $div = $('<div />');

  $specials
    .append($div)
    .find('li.buttons')
    .remove();

  $specials
    .find('select')
    .change(function() {
      var day = $(this).val();
      var special = list[day];
      $div.empty();
      if (special) {
        that.display(special);        
      }
  });
}

Specials.prototype.display = function(data) {
  var $title = $('<h2 />');
  var $text = $('<p />');
  var $image = $('<img />');

  $div.append($title, $text, $image);
  
  $title
    .css('color', data.color)
    .html(data.title);

  $text.html(data.text);
  $image.attr('src', data.image);
}

$(document).ready(function() {
  var specials = new Specials();
  specials.init();
});
