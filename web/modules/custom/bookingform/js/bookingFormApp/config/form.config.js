bookingformJS.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    // Booking Summary as a nested state
    .state('bookingSummary', {
      name : 'bookingSummary',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_booking-summary.html'
    })
    // route for the home page
    .state('bookingSummary.bookingForm', {
      url : '/',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_booking-details.html'
    })

    // route for the about page
    .state('bookingSummary.bookingDetails', {
      url : '/page2',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_student-details.html'
    })

    .state('bookingSummary.bookingReview', {
      url : '/page3',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_review-booking.html'
    })

    .state('emailQuote', {
      url : '/email',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_email-quote.html'
    })

    .state('bookingConfirmation', {
      url : '/confirmation',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_booking-confirmation.html'
    })

    .state('emailConfirmation', {
      url : '/confirmation',
      templateUrl : 'modules/bookingform/js/bookingFormApp/templates/_email-confirmation.html'
    })

  $urlRouterProvider.otherwise('/');

})

bookingformJS.value('formSteps', [
  { uiSref: 'bookingSummary.bookingForm', valid: false },
  { uiSref: 'bookingSummary.bookingDetails', valid: false },
  { uiSref: 'bookingSummary.bookingReview', valid: false },
  { uiSref: 'bookingConfirmation', valid: false },
  { uiSref: 'emailConfirmation', valid: false },
  { uiSref: 'emailQuote', valid: false }

])

bookingformJS.run([
  '$rootScope',
  '$state',
  'formSteps',
  function($rootScope, $state, formSteps) {

    // Register listener to watch route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

          var canGoToStep = false;
          // only go to next if previous is valid
          var toStateIndex = _.findIndex(formSteps, function(formStep) {
            return formStep.uiSref === toState.name;

          });

          console.log('toStateIndex',toStateIndex)
          if(toStateIndex === 0) {
            canGoToStep = true;
          } else {
            canGoToStep = formSteps[toStateIndex - 1].valid;
          }
          console.log('canGoToStep', toState.name, canGoToStep);

          // Stop state changing if the previous state is invalid
          if(!canGoToStep) {
              // Abort going to step
              event.preventDefault();
          }
      });


  }
])
