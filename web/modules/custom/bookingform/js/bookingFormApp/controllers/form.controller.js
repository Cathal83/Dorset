bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $location, dataService, formService, formSteps) {
  /**
   * Default user settings
   */
  $scope.user = {
    date : new Date(),
    deliverymode : null,
    productName : "Bachelor of Business",
    firstname : "Javier",
    surname : "Torrado",
    country : "Ireland",
    email : "chavi809@gmail.com",
    dob : "2018-08-01",
    gender : "F",
    contactaddress : {
      address1 : "Flat 2",
      address2 : "13 Dalymount",
      county : "Dublin",
      country : "Ireland",
      city : "Dublin",
      postalcode : "D7"
    }
  }
  /**
   * Step number and show product select
   */
  $scope.step = "1";
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

  // Get countries list
  dataService.getCountries().then(function(response) {

    $scope.countries = response;

  });

  // Gets product delivery types based on product chosen/selected
  $scope.productIsolate = function(productnid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    // Hide Product Select
    $scope.showProductSel = false;
    
    var productData = formService.productDelivery(productnid, $scope.products);

    $scope.productData = productData;
    $scope.user.productName = productData[0].title;
    $scope.user.application = productData[0].application_type;

    // In case only one option it selects it by default
    if(productData.length == 1) {

      $scope.user.deliverymode = productData[0].delivery_mode;

    } else { }

  }

  /**
   * 
   * Get Documents from Product and Delivery chosen
   * 
   */
  var productDocuments = function(productData, productDelivery) {

    var docs = formService.productDocuments(productData, productDelivery);
    console.log(docs);
    $scope.productData = docs;

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

        var productData = response;
        // Scope everything
        $scope.showProductSel = false;
        $scope.user.productnid = productData[0].nid;
        $scope.user.productName = productData[0].title;
        $scope.user.application = productData[0].application_type;
        $scope.productData = productData;

        // In case only one option it selects it by default
        if(productData.length == 1) {

          $scope.user.deliverymode = productData[0].delivery_mode;

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
      // Product Selection to Application Steps
      case 'bookingForm' :
        // Get products needed for course application
        var productData = productDocuments($scope.productData, $scope.user.deliverymode);
        console.log(productData);
        $scope.productData = productData;
        /** 
         * In case deposit or Documents application needed
         * 33 : Deposit
         * 32 : Documents Review
        **/
         if($scope.user.application == "33") {
          return 'steps-application'
        }
        else {
          return 'steps-deposit'
        }
        break;
      // Goes to Deposit/ Application depending on Course
      case 'steps-deposit' : case 'steps-application' :
        return 'customer-details'
        break;
      // Documents Sumissions
      case 'customer-details' :
        // if documents needed go to documents submissions, if not payment
        if(productData.document == ""){
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
