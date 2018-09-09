bookingformJS.service("postService", function ($filter, $location, $http, dataService) {
  // Elements to bankFormat Process
  var submitData = function(data, token) {
    // Document values process
    // If no documents
    if (Object.keys(data.docs).length === 0) {
      var docsBoolean = "No";
    }
    else {
      var docsBoolean = "Yes";
      var docs = Object.keys(data.docs).map(function (k) { return data.docs[k].name }).join(", ");
    }
    // If payment
    if (Object.keys(data.payment).length === 0) {
      var paymentBoolean = "No";
    }
    else {
      var paymentBoolean = "Yes";
    }

    // Bookingform Fields
    var postData = {

      webform_id: "application_form",
      application_date: data.date,
      application_type: data.application,
      courseid: data.productnid,
      course_name: data.productname,
      delivery_mode: data.deliveryname,
      email: data.email,
      nationality: data.nationality.name,
      country_of_residence: data.residence.name,
      firstname: data.firstname,
      lastname: data.lastname,
      phone_number: data.phonenumber,
      pps_number: data.ppsnumber,
      date_of_birth: data.dob,
      address_line_1: data.contactaddress.address1,
      address_line_2: data.contactaddress.address2,
      county: data.contactaddress.county,
      country: data.contactaddress.country,
      city_town: data.contactaddress.city,
      postal_code: data.contactaddress.postalcode,
      payment: paymentBoolean,
      stripe_id: data.stripeId,
      dropbox_folder_name: data.docs.folderId, 
      payment_type: data.payment.type_id,
      payment_amount: data.payment.amount,
      contact_address_as_billing: data.billingaddress.billingcontact,
      billing_address_1: data.billingaddress.address1,
      billing_address_2: data.billingaddress.address2,
      billing_city_town: data.billingaddress.city,
      billing_county: data.billingaddress.county,
      billing_country: data.billingaddress.country,
      billing_postal_code: data.billingaddress.postalcode,
      documents: docs,
      documents_submitted: docsBoolean,

    };

    var postData = JSON.stringify(postData);
    var config = {
      headers : {
        'X-CSRF-Token' : token,
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ZGNhZG1pbjpKQHYxM3JEMHJzM3Q='
      }
    }

    return $http.post('/webform_rest/submit', postData, config)
    .then(function successCallback(response) {
      return response.status;
    }, function errorCallback(response) {
      return response.status;
    }); 

  }
  return {
    submitData: submitData,
  };
})