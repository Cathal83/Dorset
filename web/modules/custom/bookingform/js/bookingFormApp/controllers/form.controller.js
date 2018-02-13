bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $location, $controller, dataService, formService, formSteps) {
  /**
   * Default user settings
   */
  $scope.user = {
    date : new Date(),
    deliverymode : null,
    productName : "Bachelor of Business",
    firstname : "Javier",
    surname : "Torrado",
    country : "Ireland",
    email : "chavi809@gmail.com",
    dob : "2018-08-01",
    gender : "F",
    contactaddress : {
      address1 : "Flat 2",
      address2 : "13 Dalymount",
      county : "Dublin",
      country : "Ireland",
      city : "Dublin",
      postalcode : "D7"
    }
  }
  /**
   * Step number and show product select
   */
  $scope.steps = {
    1 : "Personal Details",
    2 : "Required Documents",
    3 : "Deposit/ Payment",
    4 : "Completion!"
  }
  $scope.showProductSel = true;

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
    $scope.user.productName = productData[0].title;
    $scope.user.application = productData[0].application_type;
    
    // In case only one option it selects it by default
    if(productData.length == 1) {

      $scope.user.deliverymode = productData[0].delivery_mode;

    } else { }

  }
  
  // Gets product delivery types based on product chosen/selected
  $scope.productIsolate = function(productnid, user) {
    
    // Reset delivery mode value
    $scope.user.deliverymode = null;
    var productData = formService.productDelivery(productnid, $scope.products);

    scopeVars(productData);

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

    var docs = formService.productDocuments(productData, productDelivery);
    console.log(docs);
    $scope.productData = docs;
    return docs;

  }

  /**
   * Controller for Templates and Form Steps
  */
  $controller('viewCtrl', { $scope, formSteps, $state, productDocuments });

})
