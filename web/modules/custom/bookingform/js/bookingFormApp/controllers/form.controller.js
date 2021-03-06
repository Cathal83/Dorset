bookingformJS.controller("formCtrl", function($scope, $window, $http, $filter, $state, $window, $location, $q, $controller, $anchorScroll, dataService, formService, postService, formSteps, stripe) {
  /**
   * Default user settings
   */
  $scope.user = {
    date : new Date(),
    productname : "",
    deliverymode : "",
    deliveryname : "",
    validatedby : "",
    startdate : "",
    firstname : "",
    lastname : "",
    country : "",
    nationality : {
      name: ""
    },
    residence : {
      name: ""
    },
    email : "",
    phonenumber: "",
    ppsnumber: "",
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
    },
    // Document Details
    docs : {}
  }
  $scope.payment = {
    status: "",
    amount: "",
    ccencoded: "",
    card : {
      number : "",
      cvc : "",
      exp: "",
    } 
  }

  $scope.showProductSel = true; 
  $scope.maxSize = [];

  /**
   * Needed Scopes by default
   */
  $scope.status = [];
  $scope.status.error = [];
  $scope.status.error.payment = 0;
  $scope.status.error.docs = 0;
  $scope.status.error.data = 0;
  $scope.status.processing = 0;
  $scope.status.upload = 0;
  $scope.status.data = 0;
  $scope.status.payment = 0;
  $scope.years = [];
  $scope.nationalities;
  $scope.countries;
  $scope.token = '';

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

  // Get CSRF code for post request
  dataService.getCSRF().then(function(response){

    $scope.token = response;
    
  });

  // Scope all product data from functions
  var scopeVars = function(productData) {

    // Hide Product Select
    $scope.showProductSel = false;
    $scope.productData = productData;
    $scope.user.productnid = productData[0].nid;
    $scope.user.productname = productData[0].title;
    $scope.user.deliveryname = productData[0].price_group;
    $scope.user.application = productData[0].application_type;
    $scope.user.validatedby = productData[0].validated_by;
    
    // Case QQI - used to display PPS Number Field
    if($scope.user.validatedby.indexOf('QQI') >= 0) {
      console.log(productData[0].validated_by);
      $scope.user.isqqi = 1;
    }
    else {
      $scope.user.isqqi = 0;
    }

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
      // Upercase and replaces underscore for Payment Type display
      var price_type = price_type.replace('_', ' ');
      $scope.user.payment.type_txt = price_type.charAt(0).toUpperCase() + price_type.slice(1);
      $scope.user.payment.amount = $scope.productPrices[0].full_amount;
    }
    else {
      // Upercase and replaces underscore for Payment Type display
      var price_type = price_type.replace('_', ' ')
      $scope.user.payment.type_txt = price_type.charAt(0).toUpperCase() + price_type.slice(1);
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

    // Disable submit button and default values on sumission
    $scope.submit = true;
    $scope.status.error.payment = 0;
    $scope.status.error.docs = 0;
    $scope.status.error.data = 0;

    /**
     * Data upload for emailing via Drupal Backend
     */
    var dataUp = function() {
      /**
       * Status data
       */
      $scope.status.processing = 0;
      $scope.status.upload = 0;
      $scope.status.data = 1;

      /**
       * Sends Data
       */
      postService.submitData($scope.user, $scope.token).then(function (response) {
        if (response == 200) {
          console.log('Data submitted');
          $scope.status.data = 0;
          $scope.goToNextSection(true);
        }
        else {
          $scope.status.data = 0;
          $scope.status.error.data = 1;
          $scope.submit = false;
          console.log('Error uploading Data');
        }
      });
    }

    /**
     * Payment and document sumission function
     */
    if ($scope.productData[0].application_type == "60") {
      /**
       * Payment Applications
       */
      $scope.status.processing = 1;

      // Submits payment and data
      $scope.charge().then(function (response) {
        // Status Data
        // 200 = no errors
        if (response == '200') {
          // Payment status update
          $scope.status.processing = 0;
          dataUp();
        }
        else { 
          $scope.status.processing = 0;
          $scope.status.error.payment = 1;
          $scope.submit = false;
        }
      });
    }

    if ($scope.productData[0].application_type == "61"){
      /**
       * Documents Application submit everything
       */
      $scope.status.processing = 0;
      $scope.status.processing = 1;
      $scope.status.upload = 1;

      console.log($scope.status.upload);
      $scope.docsUp().then(function(response){
        $scope.status.upload = 0;
        dataUp();
      }).catch(function (err) {
        $scope.status.error.docs = 1;
      });
    }   
  }

  /**
   * Controller for Templates and Form Steps
  */
  $controller('viewCtrl', { $scope: $scope, $window: $window, formSteps: formSteps, $state: $state, $location: $location, $anchorScroll: $anchorScroll, productDocuments: productDocuments, dataService: dataService });
  $controller('paymentCtrl', { $scope: $scope, $http: $http, $location: $location, stripe: stripe, dataService: dataService });
  $controller('docsCtrl', { $scope: $scope, $http: $http, $filter: $filter, $q: $q });
})
