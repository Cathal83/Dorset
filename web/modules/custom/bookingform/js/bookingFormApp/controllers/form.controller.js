bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $window, $location, $controller, dataService, formService, formSteps, Upload, stripe) {
  /**
   * Default user settings
   */
  $scope.user = {
    date : new Date(),
    productname : "Bachelor of Business",
    deliverymode : "Part-Time",
    firstname : "Javier",
    lastname : "Torrado",
    country : "Ireland",
    email : "chavi809@gmail.com",
    dob : "2018-08-01",
    gender : "Female",
    contactaddress : {
      address1 : "Flat 2",
      address2 : "13 Dalymount",
      county : "Dublin",
      country : "Ireland",
      city : "Dublin",
      postalcode : "D7"
    },
    billingaddress: {
      billingcontact: true,
      address1 : "Flat 2",
      address2 : "13 Dalymount",
      county : "Dublin",
      country : "Ireland",
      city : "Dublin",
      postalcode : "D7"
    },
    // Payment details chosen
    payment: {
      type_id: "",
      type_txt: "",
      amount: ""
    }
  }
  /**
  $scope.payment = {
    amount: "1000000",
    card : {
      number : "4242424242424242",
      cvc : "555",
      exp: "02/2020",
      address_zip: "D7"
    } 
  }
  **/

  $scope.productData = [{"nid":"22","faculty":"Business Accounting Courses","course_type":"Undergraduate","title":"ACCA Diploma in Accounting and Finance","application_type":"33","document":"test","delivery_mode":"Part-Time","delivery_mode_id":"12"}];
  $scope.productPrices = [{"delivery_id":"13","price_amount":"\u20ac3,000.00","payment_type_txt":"Full Payment","course_id":"22","payment_type_id":"3"},{"delivery_id":"13","price_amount":"\u20ac300.00","payment_type_txt":"Deposit","course_id":"22","payment_type_id":"4"}];
  $scope.showProductSel = true; 
  $scope.user.docs;
  $scope.maxSize = [];

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

  // Scope all product data from functions
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
   * Scopes prices to the user data
   */
  $scope.scopePrices = function(type_id) {

    var prices = formService.productPrices(type_id, $scope.productPrices);
    $scope.user.payment.type_id = prices[0].payment_type_id;
    $scope.user.payment.type_txt = prices[0].payment_type_txt; 
    $scope.user.payment.amount = prices[0].price_amount;

  }
  /**
   * 
   * Removes product selected when cancel button is clicked
   * 
  */
  $scope.remProduct = function() {
    
    delete $scope.user.productnid;
    delete $scope.user.productname;
    $scope.showProductSel = true;

  }

  // Gets product delivery types based on product chosen/selected
  $scope.productIsolate = function(productnid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    var productData = formService.productDelivery(productnid, $scope.products);
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
   * Upload documents settings and errors
   * Give error in case the document is too big
  **/
  $scope.docSize = function(doc, n){

    if (doc != null) {

      var size = doc.size / 1000000;

      if (size > 5) {
        $scope.user.docs[n] = null;
        $scope.maxSize[n] = "error"; // send error
      }
      else {
        $scope.maxSize[n] = null;
      }

    } else {}

  }

  $scope.uploadDocs = function(){
    // Number of files
    var n = $scope.docs.length;
    var docs = $scope.docs;
    /**
    UPLOAD FILES TO SERVER
    for (var i=0; i<n; i++) {
      var file = $scope.docs[i]
      console.log(file);
      file.upload = Upload.http({
        url: 'http://localhost/web/jsonapi/file/document',
        method: 'POST',
        data: {
          type: 'file--document',
          key: file.name,
          filename: file.name,
          file: file
        },
        headers: {
          "Authorization": "Basic d2ViZm9ybV91c2VyOmttdm90UWZLa1BtQ2VRWTNmfUti",
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json"
        }
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      });
    }
    */
  }
  /**
   * Controller for Templates and Form Steps
  */
  $controller('viewCtrl', { $scope, formSteps, $state, productDocuments, dataService });
  $controller('paymentCtrl', { $scope, $http, $location, stripe, dataService });

})
