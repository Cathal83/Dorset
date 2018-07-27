bookingformJS.controller("paymentCtrl", function($scope, $http, $location, stripe, dataService) {
    /**
     * Creates Stripe token for Payment
     * submits payment to Stripe API PHP Plugin
     */
    $scope.charge = function charge() {
      
      /**
       * Gets token for payment based on Card collected
       * and amount in the correct format
       */
      var stripecard = {
        number: $scope.payment.card.number,
        cvc: $scope.payment.card.cvc,
        exp: $scope.payment.card.exp,
      };
      
      var amount = Number($scope.user.payment.amount.replace(/[^0-9\.-]+/g, ""));

      return stripe.card.createToken(stripecard)
      .then(function (response) {
        var payment = {
          tk_id : response.id,
          email : $scope.user.email,
          amount: amount * 100, //Amount in cents
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
        console.log('successfully submitted payment');
        console.log(payment);
        $scope.stripeId = '';
        return '200';
      })
      .catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          return '100';
          console.log('Stripe error: ', err.message);
        }
        else {
          return '100';
          console.log('Other error occurred, possibly with your API', err.message);
        }
      })
    }
})(bookingformJS);
  