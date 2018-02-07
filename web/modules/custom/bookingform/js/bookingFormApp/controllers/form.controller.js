bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, dataService, formService) {

  // Get Data from services
  dataService.getProducts().then(function(response) {

    $scope.products = response;

  });

  // Get Countries list
  dataService.getCountries().then(function(response){

    $scope.countries = response;

  })

  // Returns delivery modes once course is chosen
  $scope.courseDelivery = function(productid) {
    console.log(productid);
    var deliveryTypes = formService.courseDelivery(productid, $scope.products);
    $scope.deliveryTypes = deliveryTypes;

    console.log(deliveryTypes);

  }
})
