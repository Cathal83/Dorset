bookingformJS.service("formService", function($filter, $location, dataService) {

    var productDelivery = function(coursenid, products) {

        var courseDelivery = $filter('filter')(products, {nid: coursenid }, true);
        return courseDelivery;

    }

    return {
        productDelivery: productDelivery

    };

})