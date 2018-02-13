bookingformJS.service("formService", function($filter, $location, dataService) {

    var productDelivery = function(productnid, products) {

        var productDelivery = $filter('filter')(products, { nid: productnid }, true);
        return productDelivery;

    }

    var productDocuments = function(productData, productDelivery) {

        var productDocs = $filter('filter')(productData, { delivery_mode: productDelivery }, true);
        return productDocs;

    }
    return {
        productDelivery : productDelivery,
        productDocuments : productDocuments
    };

})