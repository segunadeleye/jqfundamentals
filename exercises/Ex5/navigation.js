
function Navigation() {
}

Navigation.prototype.showDropDown = function() {
  
  $navTab = $('#nav li');

  $navTab.hover(
    function() {
      $(this)
        .addClass('hover')
        .find('ul')
        .show();
    },
    
    function() {
      $(this)
        .removeClass('hover')
        .find('ul')
        .hide();
    }
  );
}

$(document).ready(function() {
  var navigation = new Navigation;
  navigation.showDropDown();
});
