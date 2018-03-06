bookingformJS.controller("paymentCtrl", function($scope, $http, stripe, dataService) {
    /**
     * Creates Stripe token for Payment
     * submits payment to Stripe API PHP Plugin
     */
    $scope.charge = function charge() {

      return stripe.card.createToken($scope.payment.card)
      .then(function (response) {
        var payment = {
          tk_id : response.id,
          email : $scope.user.email,
          amount : $scope.payment.amount,
          firstname : $scope.user.firstname,
          lastname : $scope.user.lastname,
          product : $scope.user.productName
        }
        
        // Get CSRFToken for POST Request
        var CSRFToken = dataService.getCSRF();
        
        CSRFToken.then(function(result){
          console.log(payment);
          console.log(CSRFToken);
          /**return $http.post('http://192.168.99.100/api/payment?_format=json',
          {
            headers: {
              'Authorization' : 'Basic ZGNhZG1pbjpKQHYxM3JEMHJzM3Q=',
              'Content-Type' : 'application/json',
              'X-CSRF-Token' : CSRFToken
            },
            data : payment
  
          });*/
        });
      })
      .then(function (payment) {
        console.log('successfully submitted payment for €', payment.amount);
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
  