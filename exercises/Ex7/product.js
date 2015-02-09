function ProductList() {
  this.list;
}

ProductList.prototype.init = function() {
  that = this;
  this.getProductDetails();

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

ProductList.prototype.getProductDetails = function() {
  $.ajax({
    url: 'product.json',
    dataType: 'json',
    success: function(data) {
      that.saveList(data);
    },
    cache: false
  });
}

ProductList.prototype.saveList = function(response) {
  that.list = response;
  that.getAllProducts(that.list);
}

ProductList.prototype.getCheckedOptions = function() {
  var productStatus = '';
  var $checkedBrands = $('#brands').find('input:checked');
  var $checkedColors = $('#colors').find('input:checked');
  var availableProductsChecked = $('input#available').is(':checked');
  if (availableProductsChecked) {
    productStatus = '.available';
  }
  this.filterProducts($checkedBrands, $checkedColors, productStatus);
}

ProductList.prototype.getAllProducts = function(data) {
  that.emptyContainer();
  $.each(data, function(index, val) {
    that.displayProducts(val);
  });
}

ProductList.prototype.filterProducts = function(brands, colors, productStatus) {
  var $productList = $('#productList');
  var filterOptions;
  var filter = [];
  $productList
    .find('div:visible')
    .hide();

  if (brands.length) {
    brands.each(function() {
      brandClass = '.' + $(this).val();
      if (colors.length) {
        colors.each(function() {
          colorClass = '.' + $(this).val();
          filterOptions = brandClass + colorClass + productStatus;
          filter.push(filterOptions)
        });
      } else {
        filterOptions = brandClass + productStatus;
        filter.push(filterOptions)
      }
    });
  } else if (colors.length) {
    colors.each(function() {
      colorClass = '.' + $(this).val();
      filterOptions = colorClass + productStatus;
      filter.push(filterOptions)
    });
  } else {
    $productList
      .find('div' + productStatus)
      .show();
    return;
  }
  filter = filter.join(',');
  console.log(filter);

  $productList
    .find(filter)
    .show();
}

ProductList.prototype.displayProducts = function(product) {
  var productStatus;
  if (product.sold_out === '0') {
    productStatus = 'available';
  }
  var $div = $('<div />')
    .addClass(product.brand)
    .addClass(productStatus)
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
