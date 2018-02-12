bookingformJS.service("formService", function($filter, $location, dataService) {

    var productDelivery = function(productnid, products) {

        var productDelivery = $filter('filter')(products, { nid: productnid }, true);
        return productDelivery;

    }

    var productDocuments = function(productInfo, productDelivery) {

    }
    return {
        productDelivery : productDelivery,
        productDocuments : productDocuments
    };

})