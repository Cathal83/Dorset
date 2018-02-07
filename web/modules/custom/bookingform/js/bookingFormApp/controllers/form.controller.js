bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, dataService, formService) {

  // Get Data from services
  dataService.getProducts().then(function(response) {
    // Split data into variables
    //$scope.courses = $filter('filter')(response, {type: "title"}, true); 
    $scope.products = response;

  });

  // Returns delivery modes once course is chosen
  $scope.courseDelivery = function(productid) {
    console.log(productid);
    var deliveryTypes = formService.courseDelivery(productid, $scope.products);
    $scope.deliveryTypes = deliveryTypes;

    console.log(deliveryTypes);

  }
})
