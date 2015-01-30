function ItemStack() {
  this.itemCount = 0;
}

ItemStack.prototype.addItem = function() {  
  that = this;
  $('#add').click(function() {
    $('<div />')
      .text(++that.itemCount)
      .appendTo('#container');
  });
  this.hightlightItem();
  this.removeItem();
}

ItemStack.prototype.hightlightItem = function() {
  $('#container').delegate('div', 'click', function() {
    $(this).addClass('highlighted');
  });
}

ItemStack.prototype.removeItem = function() {
  $('#container').on('click', 'div:last', function() {
    $(this).remove();
    --that.itemCount;
  });
}

$(document).ready(function() {
  var stack = new ItemStack();
  stack.addItem();
});
