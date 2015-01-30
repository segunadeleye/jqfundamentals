function ItemStack() {
  this.itemCount = 0;
}

ItemStack.prototype.init = function() {  
  that = this;
  this.addItem();
  this.hightlightItem();
  this.removeItem();
}

ItemStack.prototype.addItem = function() {
  $('#add').click(function() {
    $('<div />')
      .text(++that.itemCount)
      .addClass('stack')
      .appendTo('#container');
  });
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
  stack.init();
});
