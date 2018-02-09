bookingformJS.service("formService", function($filter, $location, dataService) {

    var productDelivery = function(productnid, products) {

        var productDelivery = $filter('filter')(products, { nid: productnid }, true);
        return productDelivery;

    }

    return {
        productDelivery: productDelivery

    };

})