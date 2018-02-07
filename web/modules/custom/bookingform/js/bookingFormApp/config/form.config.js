bookingformJS.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('bookingForm', {
            url : '/',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_booking-details.html'
        })

        .state('bookingSteps', {
            url : '/bookingsteps',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_booking-steps.html'
        })
        
})

bookingformJS.value('formSteps', [
    { uiSref: 'bookingForm', valid: false },
    { uiSref: 'bookingSteps', valid: false }
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
  