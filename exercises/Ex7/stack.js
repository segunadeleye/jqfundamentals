function ItemStack() {
  this.itemCount = 0;
}

ItemStack.prototype.init = function() {  
  that = this;
  this.addItem();
  this.hightlightOrDeleteItem();
}

ItemStack.prototype.addItem = function() {
  $('#add').click(function() {
    $('<div />')
      .text(++that.itemCount)
      .addClass('stack')
      .appendTo('#container');
  });
}

ItemStack.prototype.hightlightOrDeleteItem = function() {
  $('#container').delegate('div', 'click', function() {
    var $this = $(this);
    if ($this.is(':last-child')) {
      $this.remove();
      --that.itemCount;
    } else {
      $this.addClass('highlighted');
    }
  });
}

$(document).ready(function() {
  var stack = new ItemStack();
  stack.init();
});
