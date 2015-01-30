function ProductList() {
  this.response;
}

Product.prototype.init = function() {
  that = this;
  this.getProductDetails(this.getAllProducts);

  var $brand = $('#brand').find('input');
  var $color = $('#color').find('input');
  $brand.click(function() {
    that.getCheckedOptions();
  });
  $color.click(function() {
    that.getCheckedOptions();
  });

  $('#all').click(function() {
    that.getProductDetails(that.getAllProducts);
  });
  $('#available').click(function() {
    that.getProductDetails(that.getAvailableProducts);
  });
}

Product.prototype.getProductDetails = function(callback) {
  $.ajax({
    url: 'product.json',
    dataType: 'json',
    success: function(data) {
      callback(data);
    },
    cache: false
  });
}

Product.prototype.getCheckedOptions = function() {
  var $checkedBrand = $('#brand').find('input:checked');
  var $checkedColor = $('#color').find('input:checked');
  this.filterProducts($checkedBrand, $checkedColor);
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

Product.prototype.filterProducts = function(brand, color) {
  var $productImages = $('#brandImages');
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

Product.prototype.displayProducts = function(product) {
  var $div = $('<div />')
    .addClass(product.brand)
    .addClass(product.sold_out)
    .addClass(product.color);
  $name = $('<p />').text('Product Name: ' + product.name);
  $image = $('<img />').attr('src', 'images/' + product.url);
  $div.append($name, $image);
  $('#brandImages').append($div);
}

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
