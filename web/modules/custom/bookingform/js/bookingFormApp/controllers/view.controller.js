bookingformJS.controller("viewCtrl", function($scope, formSteps, $state, productDocuments) {

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
        console.log($scope.productData);
        if($scope.productData.document == ""){
          return 'payment';
        }
        else {
          return 'customer-files'
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