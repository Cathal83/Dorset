bookingformJS.controller("paymentCtrl", function($scope, $http, $location, stripe, dataService) {
    /**
     * Creates Stripe token for Payment
     * submits payment to Stripe API PHP Plugin
     */
    $scope.charge = function charge() {
      
      /**
       * Gets token for payment based on Card collected
       */
      return stripe.card.createToken($scope.payment.card)
      .then(function (response) {
        var payment = {
          tk_id : response.id,
          email : $scope.user.email,
          amount : $scope.payment.amount,
          firstname : $scope.user.firstname,
          lastname : $scope.user.lastname,
          product : $scope.user.productname
        }
        
        return $http.post(window.location.origin + '/api/v2/payment?_format=json',
        {
          headers: {
            'Content-Type' : 'application/json'
          },
          data : payment
        });
      })
      .then(function (payment) {
        console.log('successfully submitted payment for €', $scope.payment.amount);
      })
      .catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
        }
        else {
          console.log('Other error occurred, possibly with your API', err.message);
        }
      })
    }
})
  