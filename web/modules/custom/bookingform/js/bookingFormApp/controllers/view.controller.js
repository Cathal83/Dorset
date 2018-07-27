bookingformJS.controller("viewCtrl", function($scope, $window, formSteps, $state, $location, $anchorScroll, productDocuments,  dataService) {

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
      // Product Selection to Application Steps
      case 'bookingForm' :
        // Get products needed for course application
        productDocuments($scope.productData, $scope.user.deliverymode);
        return 'steps'
        break;

      // Goes to Deposit/ Application depending on Course
      case 'steps' :
        return 'customer-details'
        break;

      // Documents Sumissions
      case 'customer-details' :
        // if documents needed go to documents submissions, if not payment
        if(!$scope.productData[0].document && $scope.productData[0].application_type == "61") {
          // Get prices for the chosen course and delivery mode
          return 'summary'
        }
        else if ($scope.productData[0].application_type == "60") {
          return 'payment'
        }
        else if ($scope.productData[0].application_type == "61") {
          return 'customer-files';
        }
        break;

      // Go to Payment from Customer Documents
      case 'customer-files' :
        // Application type 38 = no payment available
        if($scope.productData[0].application_type == "61") {
          return 'summary'
        }
        else {
          return 'payment'
        }
        break;

      // Got to the summary step
      case 'payment' :
        return 'summary'
        break;
      
    // Go to thank you page
      case 'summary' :
        return 'thank-you'
        break;
    }

  }

  //Form steps - Previous
  var previousState = function(currentState) {
    
    switch (currentState) {
      case 'steps':
        return 'bookingForm'
        break;

      case 'customer-details':
        return 'steps'
        break;

      case 'payment':
        if($scope.productData[0].document == "") {
          return 'customer-details'
        }
        else {
          return 'customer-files'
        }
        break;

      case 'customer-files':
        return 'customer-details'
        break;

      case 'summary':
        if ($scope.productData[0].application_type == "61") {
          return 'customer-files'
        }
        else if ($scope.productData[0].application_type == "60"){
          return 'payment'
        }
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
    console.log(isFormValid);
    $scope.formStepSubmitted = true;
    $window.scrollTo(0, 131);
    if(isFormValid) {
      // reset this for next form
      $scope.formStepSubmitted = false;

      // mark the step as valid so we can navigate to it via the links
      updateValidityOfCurrentStep(true /*valid */);

      $state.go(nextState($state.current.name), { '#': 'section-header'});
      
    } else {
      // mark the step as valid so we can navigate to it via the links
      updateValidityOfCurrentStep(false /*not valid */);
    }
  };
  
  // Function that returns previous State of the form - in case back button is clicked
  $scope.goToPreviousSection = function() {
    $window.scrollTo(0, 131);
    $state.go(previousState($state.current.name), { '#': 'section-header'});

  }

  // Function that goes to a specific section
  $scope.goToSection = function(section) {
    
    $state.go(section, { '#': 'section-header'});

  }
})