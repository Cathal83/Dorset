bookingformJS.factory("dataService", function($http) {

    //Get all website Products
    var Products = function() {
        return $http.get("http://192.168.99.100/web/ng-course")
        .then(function(response) {
            return response.data;
        });
    }

    var Countries = function() {
        return $http.get("http://192.168.99.100/web/modules/custom/bookingform/js/bookingFormApp/data/countries.json")
        .then(function(response) {
            return response.data;
        });
    }
    return {
        getProducts: Products,
        getCountries: Countries
    };
})