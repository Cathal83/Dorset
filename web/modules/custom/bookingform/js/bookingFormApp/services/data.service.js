bookingformJS.service("dataService", function($http, $filter) {

    //Get all website Products
    var Products = function() {
        return $http.get("http://192.168.99.100/web/modules/custom/bookingform/js/bookingFormApp/data/products.json")
        .then(function(response) {
            return response.data;
        });
    }

    var ProductData = function(productnid) {
        return $http.get("http://192.168.99.100/web/modules/custom/bookingform/js/bookingFormApp/data/products.json")
        .then(function(response) {
            var productData = $filter('filter')(response.data, { nid: productnid }, true);
            return productData;
        })
    }

    var Countries = function() {
        return $http.get("http://192.168.99.100/web/modules/custom/bookingform/js/bookingFormApp/data/countries.json")
        .then(function(response) {
            return response.data;
        });
    }
    return {
        getProducts: Products,
        getProductData: ProductData,
        getCountries: Countries
    };

})