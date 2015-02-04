function Navigation(navId) {
  this.navId = navId;
}

Navigation.prototype.showDropDown = function() {
  $navTab = $('#' + this.navId +' li');
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
  var navigation = new Navigation('nav');
  navigation.showDropDown();
});
