function Product() {
}

Product.prototype.init = function() {
  var that = this;
  this.getAllProductDetails();

  var $brand = $('#brand').find('input');
  var $color = $('#color').find('input');
  $color.click(function() {
    that.getChecked();
  });
  $brand.click(function() {
    that.getChecked();
  });

  $('#all').click(function() {
    that.getAllProductDetails();
  });
  $('#available').click(function() {
    that.getAvailableProductDetails()
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

Product.prototype.getAllProductDetails = function() {
  var that = this;
  $.ajax({
    url: 'product.json',
    dataType: 'json',
    success: function(result) {
      that.getAllProducts(result);
    },
    cache: false
  });
}

Product.prototype.getAvailableProductDetails = function() {
  var that = this;
  $.ajax({
    url: 'product.json',
    dataType: 'json',
    success: function(result) {
      that.getAvailableProducts(result);
    },
    cache: false
  });
}

Product.prototype.getAllProducts = function(data) {
  this.emptyContainer();
  $.each(data, function(index, val) {
    $div = $('<div />')
      .addClass(val.brand)
      .addClass(val.sold_out)
      .addClass(val.color);
    $name = $('<p />').text('Product Name: ' + val.name);
    $image = $('<img />').attr('src', 'images/' + val.url);
    $div.append($name, $image);
    $('#brandImages').append($div);
  });
}

Product.prototype.getAvailableProducts = function(data) {
  this.emptyContainer();
  $.each(data, function(index, val) {
    if (val.sold_out === '0') {
      $div = $('<div />')
        .addClass(val.brand)
        .addClass(val.sold_out)
        .addClass(val.color);
      $name = $('<p />').text('Product Name: ' + val.name);
      $image = $('<img />').attr('src', 'images/' + val.url);
      $div.append($name, $image);
      $('#brandImages').append($div);
    }
  });
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
