bookingformJS.service("dataService", function($http, $filter, $location) {

    //Get all website Products
    var Products = function() {
      //return $http.get(window.location.origin + '/ng-course')
      return $http.get(window.location.origin + '/modules/custom/bookingform/js/bookingFormApp/data/ng-course.json')
      .then(function(response) {
        return response.data;
      });
    }

    var ProductData = function(productnid) {
      //return $http.get(window.location.origin + '/ng-course')
      return $http.get(window.location.origin + '/modules/custom/bookingform/js/bookingFormApp/data/ng-course.json')
      .then(function(response) {
        var productData = $filter('filter')(response.data, { nid: productnid }, true);
        return productData;
      });
    }

    var ProductPrices = function(productnid, productdelid) {
      //return $http.get(window.location.origin + '/ng-prices')
      return $http.get(window.location.origin + '/modules/custom/bookingform/js/bookingFormApp/data/ng-prices.json')
      .then(function(response) {
        var productPrices = $filter('filter')(response.data, { course_id: productnid, delivery_id: productdelid }, true);
        return productPrices;
      });
    }

    var Countries = function() {
      return $http.get(window.location.origin + '/modules/custom/bookingform/js/bookingFormApp/data/countries.json')
      .then(function(response) {
        return response.data;
      });
    }

    var CSRF = function() {
      return $http.get(window.location.origin + '/rest/session/token')
      .then(function(response) {
        return response.data;
      });
    }
    return {
        getProducts: Products,
        getProductData: ProductData,
        getProductPrices: ProductPrices,
        getCountries: Countries,
        getCSRF : CSRF 
    };

})