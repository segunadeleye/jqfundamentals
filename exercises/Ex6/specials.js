function Specials() {
  this.list;
}

Specials.prototype.init = function() {
  that = this;
  $('#specials')
    .find('li.buttons')
    .remove();
  this.getList();
  this.filter();
}

Specials.prototype.getList = function() {
  $.ajax({
    url: 'specials.json',
    dataType: 'json',
    success: function(result) {
      that.saveList(result);
    },
    cache: false
  });
}

Specials.prototype.saveList = function(list) {
  this.list = list;
}

Specials.prototype.filter = function() {
  var $specials = $('#specials');
  $div = $('<div />');
  $specials.append($div)

  $specials
    .find('select')
    .change(function() {
      var day = $(this).val();
      var special = that.list[day];
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
