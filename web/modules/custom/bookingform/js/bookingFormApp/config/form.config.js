bookingformJS.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('bookingForm', {
            url : '/',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_booking-details.html'
        })

        .state('steps', {
            url : '/bookingsteps',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_steps.html'
        })

        .state('customer-details', {
            url : '/details',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_customer-details.html'
        })

        .state('customer-files', {
            url : '/documents',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_documents.html'
        })

        .state('payment',{
            url : '/payment',
            templateUrl : '/web/modules/custom/bookingform/js/bookingFormApp/templates/_payment.html'
        })
        
})

bookingformJS.value('formSteps', [
    { uiSref: 'bookingForm', valid: false },
    { uiSref: 'steps', valid: false },
    { uiSref: 'customer-details', valid: false },
    { uiSref: 'customer-files', valid: false },
    { uiSref: 'payment', valid: false}
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
  