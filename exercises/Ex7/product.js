function Product() {
}

Product.prototype.init = function() {
  that = this;
  this.getProducts(this.getAllProducts);

  var $brand = $('#brand').find('input');
  var $color = $('#color').find('input');
  $color.click(function() {
    that.getChecked();
  });
  $brand.click(function() {
    that.getChecked();
  });

  $('#all').click(function() {
    that.getProducts(that.getAllProducts);
  });
  $('#available').click(function() {
    that.getProducts(that.getAvailableProducts);
  });
}

Product.prototype.getChecked = function() {
  var $checkedBrand = $('#brand').find('input:checked');
  var $checkedColor = $('#color').find('input:checked');
  this.filterProducts($checkedBrand, $checkedColor);
}

Product.prototype.filterProducts = function(brand, color) {
  $productImages = $('#brandImages');
  $productImages
    .find('div')
    .hide();

  if (brand.length) {
    brand.each(function() {
      brandClass = '.' + $(this).val();
      if (color.length) {
        color.each(function() {
          colorClass = '.' + $(this).val();
          var productClass = brandClass + colorClass;
          $productImages
            .find('div' + productClass)
            .show();
        });
      } else {
        $productImages
          .find('div.' + $(this).val())
          .show();
      }
    });
  } else if (color.length) {
    color.each(function() {
      $productImages
        .find('div.' + $(this).val())
        .show();
    });
  } else {
    $productImages
      .find('div')
      .show();
  }
}

Product.prototype.getProducts = function(callback) {
  $.ajax({
    url: 'product.json',
    dataType: 'json',
    success: function(result) {
      callback(result);
    },
    cache: false
  });
}

Product.prototype.getAllProducts = function(data) {
  that.emptyContainer();
  $.each(data, function(index, val) {
    that.displayProducts(val);
  });
}

Product.prototype.getAvailableProducts = function(data) {
  that.emptyContainer();
  $.each(data, function(index, val) {
    if (val.sold_out === '0') {
      that.displayProducts(val);
    }
  });
}

Product.prototype.displayProducts = function(data) {
  $div = $('<div />')
    .addClass(data.brand)
    .addClass(data.sold_out)
    .addClass(data.color);
  $name = $('<p />').text('Product Name: ' + data.name);
  $image = $('<img />').attr('src', 'images/' + data.url);
  $div.append($name, $image);
  $('#brandImages').append($div);
};

Product.prototype.emptyContainer = function() {
  $('#brandImages').empty();
  $('#brandList')
    .find('input:checked')
    .prop('checked', '');
}

$(document).ready(function() {
  var product = new Product();
  product.init();
});
