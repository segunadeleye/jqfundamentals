function ProductList() {
  this.list;
}

ProductList.prototype.init = function() {
  that = this;
  this.getProductDetails(this.getList);

  var $brands = $('#brands').find('input');
  var $colors = $('#colors').find('input');
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
  var $checkedBrands = $('#brands').find('input:checked');
  var $checkedColors = $('#colors').find('input:checked');
  var availableProductsChecked = $('input#available').is(':checked');
  if (availableProductsChecked) {
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

ProductList.prototype.filterProducts = function(brands, colors, soldOut) {
  var $productList = $('#productList');
  $productList
    .find('div')
    .hide();

  if (brands.length) {
    brands.each(function() {
      brandClass = '.' + $(this).val();
      if (colors.length) {
        colors.each(function() {
          colorClass = '.' + $(this).val();
          var productClass = brandClass + colorClass + soldOut;
          $productList
            .find('div' + productClass)
            .show();
        });
      } else {
        $productList
          .find('div' + brandClass + soldOut)
          .show();
      }
    });
  } else if (colors.length) {
    colors.each(function() {
      $productList
        .find('div.' + $(this).val() + soldOut)
        .show();
    });
  } else {
    $productList
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
  $('#productList').append($div);
}

ProductList.prototype.emptyContainer = function() {
  $('#productList').empty();
  $('#filterOptions')
    .find('input:checked')
    .prop('checked', '');
}

$(document).ready(function() {
  var productList = new ProductList();
  productList.init();
});
