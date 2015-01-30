function ProductList() {
  this.list;
}

ProductList.prototype.init = function() {
  that = this;
  this.getProductDetails(this.getList);

  var $brands = $('#brand').find('input');
  var $colors = $('#color').find('input');
  $brands
    .add($colors)
    .add('#available')
    .click(function() {
    that.getCheckedOptions();
  });

  $('#all').click(function() {
    that.getAllProducts(that.list);
  });
}

ProductList.prototype.getProductDetails = function(callback) {
  $.ajax({
    url: 'product.json',
    dataType: 'json',
    success: function(data) {
      callback(data);
    },
    cache: false
  });
}

ProductList.prototype.getList = function(response) {
  that.list = response;
  that.getAllProducts(that.list);
}

ProductList.prototype.getCheckedOptions = function() {
  var soldOut = '';
  var $checkedBrand = $('#brand').find('input:checked');
  var $checkedColor = $('#color').find('input:checked');
  var $checkedAvailable = $('input#available');
  if ($checkedAvailable.is(':checked')) {
    soldOut = '.0';
  }
  this.filterProducts($checkedBrand, $checkedColor, soldOut);
}

ProductList.prototype.getAllProducts = function(data) {
  that.emptyContainer();
  $.each(data, function(index, val) {
    that.displayProducts(val);
  });
}

ProductList.prototype.filterProducts = function(brand, color, soldOut) {
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
          var productClass = brandClass + colorClass + soldOut;
          $productImages
            .find('div' + productClass)
            .show();
        });
      } else {
        $productImages
          .find('div' + brandClass + soldOut)
          .show();
      }
    });
  } else if (color.length) {
    color.each(function() {
      $productImages
        .find('div.' + $(this).val() + soldOut)
        .show();
    });
  } else {
    $productImages
      .find('div' + soldOut)  
      .show();
  }
}

ProductList.prototype.displayProducts = function(product) {
  var $div = $('<div />')
    .addClass(product.brand)
    .addClass(product.sold_out)
    .addClass(product.color);
  $name = $('<p />').text('Product Name: ' + product.name);
  $image = $('<img />').attr('src', 'images/' + product.url);
  $div.append($name, $image);
  $('#brandImages').append($div);
}

ProductList.prototype.emptyContainer = function() {
  $('#brandImages').empty();
  $('#brandList')
    .find('input:checked')
    .prop('checked', '');
}

$(document).ready(function() {
  var productList = new ProductList();
  productList.init();
});
