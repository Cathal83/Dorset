bookingformJS.factory("dataService", function($http) {

  var Products = function() {
    return $http.get("ng-products")
    .then(function(response) {
      return response.data;
    });
  }

  var Countries = function() {
    return $http.get("modules/bookingform/js/bookingFormApp/data/countries.json")
    .then(function(response){
      return response.data;
    });
  }

  return {
    getProducts: Products,
    getCountries: Countries
  };
})
