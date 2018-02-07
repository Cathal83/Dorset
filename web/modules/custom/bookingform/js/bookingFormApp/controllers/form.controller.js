bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, dataService, formService) {

  $scope.user = {
    deliverymode: null

  }
  // Get Data from services
  dataService.getProducts().then(function(response) {

    $scope.products = response;

  });

  // Get Countries list
  dataService.getCountries().then(function(response){

    $scope.countries = response;

  })

  // Returns delivery modes once course is chosen
  $scope.courseDelivery = function(productid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    var deliveryTypes = formService.courseDelivery(productid, $scope.products);

    // In case only one option it selects it by default
    if(deliveryTypes.length == 1) {

      $scope.deliveryTypes = deliveryTypes;
      $scope.user.deliverymode = deliveryTypes[0].delivery_mode;

    }
    else {

      $scope.deliveryTypes = deliveryTypes;

    }

  }
})
