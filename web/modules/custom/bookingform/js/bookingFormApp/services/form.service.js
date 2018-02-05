bookingformJS.service("formService", function($filter) {

  this.itemAttributes = function(product_id, products) {
    // In case of changing course after choosing weeks

    var courseAttributes = $filter('filter')(products, { product_id: product_id }, true);
    return courseAttributes;

  }

  this.itemPrice = function(product_id, attribute, products) {

    if (attribute != null && attribute != false) {

      var itemPrice = $filter('filter')(products, { product_id: product_id, attribute_weeks: attribute }, true);

      if(itemPrice.length > 0) {
        var itemPrice = itemPrice[0].price__number;
        return itemPrice;
      }
      else {
        return null;
      }
    }
    // In case no attribute for Product
    else if (attribute == 0) {

        var itemPrice = $filter('filter')(products, {product_id: product_id}, true);
        var itemPrice = itemPrice[0].price__number;
        return itemPrice;

      }
      else {}
  }

  this.bookingTotal = function(coursePrice, accommPrice, airportPrice, medPrice, fees) {
    // Remove the currency symbol
    function remCurrency(val){

      var val = val.replace('\u20ac', '');
      return val;

    }
    // Exploit and sum fees
    if(fees != null){

      var feeTotal = null;

      for(var count=0; count<fees.length; count++){

        feeTotal += parseFloat(remCurrency(fees[count].price__number));

      }

    }

    var coursePrice = remCurrency(coursePrice);
    var accommPrice = remCurrency(accommPrice);
    var airportPrice = remCurrency(airportPrice);
    var medPrice = remCurrency(medPrice);
    var total = parseFloat(coursePrice) + parseFloat(accommPrice) + parseFloat(airportPrice) + parseFloat(medPrice) + feeTotal;
    return total;

  }
})
