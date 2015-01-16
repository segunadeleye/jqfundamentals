
$(document).ready(function() {

  $navTab = $('#nav li');

  $navTab.hover(
    function() {
      $(this).addClass('hover')
              .find('ul').show();
    },
    function() {
      $(this).removeClass('hover')
              .find('ul').hide();
    }
  );
});
