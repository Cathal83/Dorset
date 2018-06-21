bookingformJS.service("postService", function ($filter, $location, $http, dataService) {
  // Elements to bankFormat Process
  var submitData = function(data, token) {

    // Bookingform Fields
    var postData = {

      webform_id: "application_form",
      application_date: data.date,
      courseid: data.productnid,
      course_name: data.productname,
      delivery_mode: data.deliverymode,
      email: data.email,
      nationality: data.nationality,
      country_of_residence: data.residence,
      firstname: data.firstname,
      lastname: data.lastname,
      date_of_birth: data.dob,
      address_line_1: data.contactaddress.address1,
      address_line_2: data.contactaddress.address2,
      county: data.contactaddress.county,
      country: data.contactaddress.country,
      city_town: data.contactaddress.city,
      postal_code: data.contactaddress.postalcode,
      stripe_id: "",
      payment_type: data.payment.type_id,
      payment_amount: data.payment.amount,
      contact_address_as_billing: data.billingaddress.billingcontact,
      billing_address_1: data.billingaddress.address1,
      billing_address_2: data.billingaddress.address2,
      billing_country: "",
      billing_postal_code: "",
      documents: "",
      documents_submitted: "",
      dropbox_folder_name: ""

    };

    var postData = JSON.stringify(postData);

    console.log(token);
    /**
    $http({
      url: window.location.origin + '/webform_rest/submit',
      method: "POST",
      data: { postData },
      headers: {
        'X-CSRF-Token' : token,
        'Content-Type' : 'application/json',
        'Authorization' : 'Basic ZGNhZG1pbjpKQHYxM3JEMHJzM3Q='
        
      }
    })
    .then(function(response) {
      console.log(response);
    }, 
    function(response) { // optional
      console.log(response);
    });
    */
    var config = {
      headers : {
        'X-CSRF-Token' : token,
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ZGNhZG1pbjpKQHYxM3JEMHJzM3Q='
      }
    }

    $http.post('/ServerRequest/PostDataResponse', postData, config)
    .success(function (data, status, headers, config) {
      console.log(data);
    })
    .error(function (data, status, header, config) {
      var ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
        "<hr />headers: " + header +
        "<hr />config: " + config;
      console.log(ResponseDetails);
    });
  }
  return {
    submitData: submitData,
  };
})