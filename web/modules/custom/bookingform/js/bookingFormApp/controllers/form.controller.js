bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $location, dataService, formService, formSteps) {
  /**
   * Default user settings
   */
  $scope.user = {
    deliverymode: null

  }
  /**
   * 
   * Show or hide Product selection depending if there's a product id passed on url
   * or not.
   * 
  **/
  // Search for course nid on URL
  var coursenid = $location.search();
  console.log(coursenid.nid);
  if(!coursenid) {
    $scope.showProductSel = false;
  }
  else {
    $scope.showProductSel = true;
  }
  
  // Get Data from services
  dataService.getProducts().then(function(response) {

    $scope.products = response;

  });

  // Get Countries list
  dataService.getCountries().then(function(response){

    $scope.countries = response;

  })

  // Return Product chosen information
  $scope.productIsolate = function(productnid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    // Hide Product Select
    $scope.showProductSel = false;

    var productInfo = formService.courseDelivery(productnid, $scope.products);

    $scope.productInfo = productInfo;
    $scope.productName = productInfo[0].title;

    // In case only one option it selects it by default
    if(productInfo.length == 1) {

      $scope.user.deliverymode = productInfo[0].delivery_mode;

    } else { }

  }

  /**
   * Form Steps Validation
   * Also view loading based on current template/view
  **/

  $scope.formData = {};
  $scope.formStepSubmitted = false;
  
  // Form steps
  // If validation passes move to the next page
  var nextState = function(currentState) {
    // Check the current page and returns the next
    switch (currentState) {

      case 'bookingForm' :
        return 'bookingSteps'
        break;

      case 'bookingSteps' :
        return 'studentDetails'
        break;

    }
  }

  // Gets the form current step
  var updateValidityOfCurrentStep=function(updatedValidity) {

    var currentStateIndex = _.findIndex(formSteps, function(formStep) {
      return formStep.uiSref === $state.current.name;
    });
    formSteps[currentStateIndex].valid = updatedValidity;

  };

  // Check if form is filled before next step
  $scope.goToNextSection = function(isFormValid) {
    // set to true to show all error messages (if there are any)
    $scope.formStepSubmitted = true;
    if(isFormValid) {
      // reset this for next form
      $scope.formStepSubmitted = false;

      // mark the step as valid so we can navigate to it via the links
      updateValidityOfCurrentStep(true /*valid */);

      $state.go(nextState($state.current.name));
    } else {
      // mark the step as valid so we can navigate to it via the links
      updateValidityOfCurrentStep(false /*not valid */);
    }
  };
})
