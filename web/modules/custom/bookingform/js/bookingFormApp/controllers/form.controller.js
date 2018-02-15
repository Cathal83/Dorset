bookingformJS.controller("formCtrl", function($scope, $http, $filter, $state, $location, $controller, dataService, formService, formSteps, Upload) {
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

  $scope.productData = [{'nid':'3','faculty':'Business Accounting Courses','course_type':'Undergraduate','title':'BA in International Business','delivery_mode':'Full-Time','application_type':'33','document':'Evidence of Prior Learning'},{'nid':'3','faculty':'Business Accounting Courses','course_type':'Undergraduate','title':'BA in International Business','delivery_mode':'Full-Time','application_type':'33','document':'English Proficiency'},{'nid':'3','faculty':'Business Accounting Courses','course_type':'Undergraduate','title':'BA in International Business','delivery_mode':'Full-Time','application_type':'33','document':'High School Transcripts'}]
  $scope.docs = [];
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

    var productData = formService.productDocuments(productData, productDelivery);
    var steps = formService.getSteps(productData);
    $scope.productData = productData;
    $scope.steps = steps;

  }
  /**
   * Upload documents settings
  **/
  $scope.uploadDocs = function(files){
    // Number of files
    var n = files.length;
    console.log(n);
    for (var i=0; i<n; i++) {
      console.log(files[n]);
    }
    /**
    file.upload = Upload.upload({
      url: 'http://192.168.99.100/web/sites/default/files/dcbookingform',
      data: {}
    });
    */
  }
  /**
   * Controller for Templates and Form Steps
  */
  $controller('viewCtrl', { $scope, formSteps, $state, productDocuments });

})
