bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, dataService, formService, postService, formSteps) {

  // DEFAULT VALUES FOR OPTIONS ON FORM
  $scope.user = {
    course: null,
    airportPick: false,
    accommNeeded: false,
    medicalInsu: false,
    flightDetail: false,
    courseWeeks: false,
    accommWeeks: false,
    items: {
      coursePrice: "0",
      accommPrice: "0",
      airportPrice: "0",
      medPrice: "0",
      fees: 0
    }
  };

  // init Datepicker
  // Min Date today's date
  $scope.minDate = new Date();

  // Only Mondays on Course picker
  $scope.onlyMonday = function(date) {

    var day = date.getDay();
    return day === 1;

  };

  // Get Data from services
  dataService.getProducts().then(function(response) {

    $scope.courses = $filter('filter')(response, {type: "course_variation_type"}, true);
    $scope.accommodations = $filter('filter')(response, {type: "accommodation_variation_type"}, true);
    $scope.insurance = $filter('filter')(response, {type: "insurance_variation_type"}, true);
    $scope.airports = $filter('filter')(response, {type: "pick_up_variation_type"}, true);
    $scope.fees = $filter('filter')(response, {type: "fee_variation_type"}, true);

  });

  // Get Country list
  dataService.getCountries().then(function(response){

    $scope.countries = response;

  });
  // Watch Items to calculate total Booking
  $scope.$watchCollection('user.items', function(newValue){

    var bookingTotal = $scope.bookingTotal($scope.user.items.coursePrice, $scope.user.items.accommPrice, $scope.user.items.airportPrice, $scope.user.items.medPrice, $scope.user.items.fees);
    $scope.user.bookingTotal = bookingTotal;

  });
  // Total invoice calculation
  $scope.bookingTotal = function(coursePrice, accommPrice, airportPrice, medPrice, fees) {

    return total = formService.bookingTotal(coursePrice, accommPrice, airportPrice, medPrice, fees);

  }

  // Form User Interations
  $scope.courseAttributes = function(course_id, weeks) {

    var itemAttributes = formService.itemAttributes(course_id, $scope.courses);
    $scope.courseAttr = itemAttributes;

    // Case of first time or change between courses or to blanks
    if(course_id != null) {
      if (weeks == false) {

        $scope.user.courseWeeks = itemAttributes[0].attribute_weeks;
        $scope.courseWeeksChosen(course_id, itemAttributes[0].attribute_weeks);

      }
      else {

        var coursePrice = formService.itemPrice(course_id, weeks, $scope.courses);
        // In case no price for attribute in new product
        if (coursePrice == null) {

          $scope.user.courseWeeks = itemAttributes[0].attribute_weeks;
          $scope.courseWeeksChosen(course_id, itemAttributes[0].attribute_weeks);

        }
        else {

          $scope.user.items.coursePrice = coursePrice;

        }
      }
    }
    // In case course deselected after being chosen
    else {
      $scope.user.items.fees = 0;
      $scope.user.items.coursePrice = "0";
      delete $scope.user.courseWeeks;
    }
  };

  $scope.accommNeeded = function(option) {
    switch (option) {
      case true:
        break;
      case false:
        $scope.user.items.accommPrice = "0";
        delete $scope.user.accommodation;
        delete $scope.user.accommWeeks;
        delete $scope.user.accommDate;
        break;

    }
  }
  // ACCOMMODATION SCOPE
  $scope.accommodationAttributes = function(accommodation_id, weeks) {
    // Case of first time or change between accommodations
    var itemAttributes = formService.itemAttributes(accommodation_id, $scope.accommodations);
    $scope.accommAttr = itemAttributes;

    if(accommodation_id != null) {
      if (weeks == false){

        $scope.user.accommWeeks = itemAttributes[0].attribute_weeks;
        $scope.accomWeeksChosen(accommodation_id, itemAttributes[0].attribute_weeks);

      }
      else {

        var accommPrice = formService.itemPrice(accommodation_id, weeks, $scope.accommodations);

        if (accommPrice == null) {

          $scope.user.accommWeeks = itemAttributes[0].attribute_weeks;
          $scope.accomWeeksChosen(accommodation_id, itemAttributes[0].attribute_weeks);

        }
        else {

          $scope.user.items.accommPrice = accommPrice;

        }
      }
    }
    else {
      $scope.user.items.accommPrice = "0";
      delete $scope.user.accommWeeks;
    }
  }

  // Returns price based on chosen course & weeks
  $scope.courseWeeksChosen = function(course_id, weeks) {

    if (weeks != null && weeks != false) {

      var coursePrice = formService.itemPrice(course_id, weeks, $scope.courses);
      $scope.user.items.coursePrice = coursePrice;

      $scope.user.items.fees = [];
      // Push all fees into the items array
      for(var count=0; count<$scope.fees.length; count++){

        var obj = {};
        obj['product_id'] = $scope.fees[count].product_id;
        obj['price__number'] = $scope.fees[count].price__number;

        $scope.user.items.fees.push(obj);

      };

    }
    else{}

  }

  // Returns price based on chosen accommodation & weeks
  $scope.accomWeeksChosen = function(accommodation_id, weeks) {

    var accommPrice = formService.itemPrice(accommodation_id, weeks, $scope.accommodations);
    $scope.user.items.accommPrice = accommPrice;

  }

  // Case of option Airport details disable after being enabled
  $scope.airportChange = function(option) {

    switch (option) {
      case true:
        break;
      case false:
        $scope.user.items.airportPrice = "0";
        $scope.user.flightNumber = '';
        $scope.user.flightDetail = false;
        delete $scope.user.aiportPickDetail;
        delete $scope.user.airportDate;
        break;

    }

  }
  // Aiport pickup price return on type chosen
  $scope.aiportChosen = function(airportType) {
    // Item with no second Variations
    var weeks = 0;
    var airportPrice = formService.itemPrice(airportType, weeks, $scope.airports);
    $scope.user.items.airportPrice = airportPrice;

  }

  $scope.flightDetail = function(option) {
    // When flight Detail filled but changed option afterwards
    switch (option) {
      case true:
        break;

      case false:
        $scope.user.flightNumber = "";
        delete $scope.user.airportDate;
        break;

    }
  }

  // Medical Insurance option chosen && delete if not
  $scope.medChosen = function(option) {
    // Item with no second variations
    switch (option) {
      case true:
        var weeks = 0;
        var medPrice = formService.itemPrice($scope.insurance.product_id, weeks, $scope.insurance);
        $scope.user.items.medPrice = medPrice;
        break;

      case false:
        $scope.user.items.medPrice = "0";
        break;

    }
  }


  /**
    Form Steps Validation Process
  **/

  $scope.formData = {};
  $scope.formStepSubmitted = false;

  // If validation passes move to the next page
  var nextState = function(currentState) {
    // Check the current page and returns the next
    switch (currentState) {

      case 'bookingSummary.bookingForm' :
        return 'bookingSummary.bookingDetails'
        break;

      case 'bookingSummary.bookingDetails' :
        return 'bookingSummary.bookingReview'
        break;

      case 'bookingSummary.bookingReview' :
        return 'bookingConfirmation'
        break;

      case 'emailQuote' :
        return 'emailConfirmation'
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

  // Get Payment type
  $scope.payType = function(type) {
    // Bank Transfer Payment
    if(type == 1){
      postService.postRequest(type, $scope.user);

    }
  }
})
