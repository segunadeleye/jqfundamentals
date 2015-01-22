
function Load() {

}

Load.prototype.loadPost = function() {

  var $headers = $('#blog h3');

  $headers.each(function() {
    var $div = $('<div />');
    $(this).data('postDiv', $div);
  });

  $headers.click(function(event) {
    event.preventDefault();
    var $h3 = $(this);
    var $postId = $h3.index('h3');
    var $li = $h3.parent('li');
    $li
      .append(
      $h3
      .data('postDiv')
      .load('blog.html div:eq(' + $postId + ')'));
  });
}

$(document).ready(function() {

  var load = new Load();
  load.loadPost();

});
