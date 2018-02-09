bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $location, dataService, formService, formSteps) {
  /**
   * Default user settings
   */
  $scope.user = {
    deliverymode: null

  }

  $scope.showProductSel = true;

  /**
   * Functions that get data from JSON
   * callable by function
   */
  var getProducts = function() {
    dataService.getProducts().then(function(response) {

      $scope.products = response;
  
    });
  }

  var getCountries = function() {
    dataService.getCountries().then(function(response) {

      $scope.countries = response;
  
    });
  }

  // Gets product delivery types based on product chosen/selected
  $scope.productIsolate = function(productnid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    // Hide Product Select
    $scope.showProductSel = false;
    
    var productInfo = formService.productDelivery(productnid, $scope.products);

    $scope.productInfo = productInfo;
    $scope.user.productName = productInfo[0].title;
    $scope.user.application = productInfo[0].application_type;

    // In case only one option it selects it by default
    if(productInfo.length == 1) {

      $scope.user.deliverymode = productInfo[0].delivery_mode;

    } else { }

  }

  /**
   * 
   * Show or hide Product selection depending if there's a product id passed on url
   * or not. If it's passed display course, else load all courses
   * 
  **/
  if($location.search().nid !== undefined){
    
    // Get product ID from URL
    var productnid = $location.search().nid;
    
    // Get Product Data from ID
    dataService.getProductData(productnid).then(function(response){

      if(response.length > 0) {

        var productInfo = response;
        // Scope everything
        $scope.showProductSel = false;
        $scope.user.productnid = productInfo[0].nid;
        $scope.user.productName = productInfo[0].title;
        $scope.user.application = productInfo[0].application_type;
        $scope.productInfo = productInfo;

        // In case only one option it selects it by default
        if(productInfo.length == 1) {

          $scope.user.deliverymode = productInfo[0].delivery_mode;

        } else { }

      }
      else {
        getProducts();
      }

    });
    
  }
  else{
    getProducts();
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
        // In case deposit or Documents application needed
        if($scope.user.application == "Documents Review Needed") {
          return 'steps-application'
        }
        else {
          return 'steps-deposit'
        }
        break;

      case 'bookingSteps' :
        return 'studentDetails'
        break;

    }
  }

  // Gets the form current step
  var updateValidityOfCurrentStep = function(updatedValidity) {

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
