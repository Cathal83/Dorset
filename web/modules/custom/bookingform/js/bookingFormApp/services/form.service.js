bookingformJS.service("formService", function($filter) {

    this.courseDelivery = function(coursenid, products) {

        var courseDelivery = $filter('filter')(products, {nid: coursenid }, true);
        return courseDelivery;

    }

})