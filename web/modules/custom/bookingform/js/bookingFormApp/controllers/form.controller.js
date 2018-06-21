bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $window, $location, $controller, dataService, formService, postService, formSteps, stripe) {
  /**
   * Default user settings
   */
  $scope.user = {
    date : new Date(),
    productname : "",
    deliverymode : "",
    firstname : "",
    lastname : "",
    country : "Ireland",
    email : "",
    dob : "",
    gender : "",
    contactaddress : {
      address1 : "",
      address2 : "",
      county : "",
      country : "",
      city : "",
      postalcode : ""
    },
    billingaddress: {
      billingcontact: true,
      address1 : "",
      address2 : "",
      county : "",
      country : "",
      city : "",
      postalcode : ""
    },
    // Payment details chosen
    payment: {
      type_id: "",
      type_txt: "",
      amount: ""
    }
  }

  $scope.payment = {
    amount: "",
    ccencoded: "",
    card : {
      number : "",
      cvc : "",
      month: "",
      year: "",
      exp: "",
      //address_zip: "D7"
    } 
  }

  $scope.showProductSel = true; 
  $scope.maxSize = [];
  /**
   * Needed Scopes by default
   */
  $scope.years = [];
  $scope.nationalities;
  $scope.countries;

  /**
   * Generates future 10 years
   * for card expiring date date picker
   */
  var date = new Date();
  var year = date.getFullYear();
  for(var y=0; y<11; y++) {
    $scope.years.push(year+y);
  }

  /**
   * Changes on credit card number
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

  // Get Nationalities
  dataService.getNationalities().then(function(response){

    $scope.nationalities = response;

  });

  // Scope all product data from functions§
  var scopeVars = function(productData) {

    // Hide Product Select
    $scope.showProductSel = false;
    $scope.productData = productData;
    $scope.user.productnid = productData[0].nid;
    $scope.user.productname = productData[0].title;
    $scope.user.application = productData[0].application_type;

    // In case only one option it selects it by default
    if(productData.length == 1) {

      $scope.user.deliverymode = productData[0].delivery_mode;

    } else { }

  }
  
  /**
   * Date checked for expiring date
   */
  $scope.cardExp = function(month, year) {

    if(month != '' &&  year != '') {
      $scope.payment.card.exp = month + '/' + year;
    }

  }

  /**
   * Encode credit card number
   */
  $scope.ccEncode = function(number) {

    if( number != undefined ) {
      $scope.payment.ccencoded = number.replace(/.(?=.{4,}$)/g, "•");
    }

  }

  /**
   * Scopes prices to the user data
   */
  $scope.scopePrices = function(price_type) {

    if (price_type == 'full_amount') {
      $scope.user.payment.amount = $scope.productPrices[0].full_amount;
    }
    else {
      $scope.user.payment.amount = $scope.productPrices[0].deposit;
    }

  }

  /**
   * 
   * Removes product selected when cancel button is clicked
   * 
  */
  $scope.remProduct = function() {
    
    delete $scope.user.productnid;
    delete $scope.user.productname;
    delete $scope.user.deliverymode;
    delete $scope.productData;

    dataService.getProducts().then(function (response) {

      $scope.products = response;

    });
    
    $scope.showProductSel = true;

  }

  // Gets product delivery types based on product chosen/selected
  $scope.productIsolate = function(productnid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    var productData = formService.productDelivery(productnid, $scope.products);
    
    if(productData[0].application_type == 60) {

      dataService.getCountries().then(function(response){

        $scope.countries = response;

      });

      dataService.getNationalities().then(function(response){

        $scope.nationalities = response;

      });
    }

    // Scopes variables to UI
    scopeVars(productData);

  }

  // Get prices from the product ID and the delivery Mode Id
  $scope.deliveryIsolate = function(nid, delid) {

    // Get prices based on Product Id and Delivery Id
    dataService.getProductPrices(nid, delid).then(function(response){

      $scope.productPrices = response;

    });

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
        scopeVars(productData);

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
   * 
   * Get Documents from Product and Delivery chosen
   * 
  */
  var productDocuments = function(productData, productDelivery) {

    var data = formService.productDocuments(productData, productDelivery);
    var steps = formService.getSteps(data);
    $scope.productData = data;
    $scope.steps = steps;
  
  }

  /**
   * 
   * Track changes on billing address checkbox and actions
   * 
   */
  $scope.billingAddress = function() {

    if ($scope.user.billingaddress.billingcontact == false) {

      $scope.user.billingaddress.address1 = "";
      $scope.user.billingaddress.address2 = "";
      $scope.user.billingaddress.county = "";
      $scope.user.billingaddress.country = "";
      $scope.user.billingaddress.city = "";
      $scope.user.billingaddress.postalcode = "";

    }
    else {

      $scope.user.billingaddress.address1 = $scope.user.contactaddress.address1;
      $scope.user.billingaddress.address2 = $scope.user.contactaddress.address2;
      $scope.user.billingaddress.county = $scope.user.contactaddress.county;
      $scope.user.billingaddress.country = $scope.user.contactaddress.country;
      $scope.user.billingaddress.city = $scope.user.contactaddress.city;
      $scope.user.billingaddress.postalcode = $scope.user.contactaddress.postalcode;

    }

  }
  /** 
   * Final submit 
   * */
  $scope.submitForm = function() {
    // Get CSRF code for post request
    dataService.getCSRF().then(function(response){$scope.token = response;});
    postService.submitData($scope.user, $scope.token);  
  }
  /**
   * Controller for Templates and Form Steps
  */
  $controller('viewCtrl', { $scope, formSteps, $state, productDocuments, dataService });
  $controller('paymentCtrl', { $scope, $http, $location, stripe, dataService });
  $controller('docsCtrl', { $scope, $http, $filter });
})
